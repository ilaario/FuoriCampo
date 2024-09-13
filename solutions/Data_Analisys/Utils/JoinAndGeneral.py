import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import seaborn as sns
import pandas as pd
import geopandas as gpd
from geopy.geocoders import Nominatim
from shapely.geometry import Point
import folium
import time

def fill_missing_values(df):
    """
    Riempie i valori nulli in specifiche colonne del DataFrame con 'Unknown' o -1.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati da riempire.

    Returns:
        pandas.Series: Una serie che indica il numero di valori nulli per colonna dopo il riempimento.
    """
    # Definiamo le colonne da riempire con 'Unknown' o -1
    columns_unknown = [
        'competition_id', 'round', 'date', 'home_club_manager_name',
        'away_club_manager_name', 'stadium', 'referee', 'url_x',
        'home_club_formation', 'away_club_formation', 'home_club_name',
        'away_club_name', 'aggregate', 'competition_type',
        'competition_code', 'name', 'sub_type', 'type',
        'country_name', 'domestic_league_code', 'confederation',
        'url_y', 'own_manager_name', 'opponent_manager_name', 'hosting'
    ]

    columns_minus_one = [
        'home_club_position', 'away_club_position', 'attendance',
        'own_position', 'opponent_position'
    ]

    # Applichiamo la sostituzione
    for column in columns_unknown:
        df[column] = df[column].fillna('Unknown')

    for column in columns_minus_one:
        df[column] = df[column].fillna(-1)

    # Verifichiamo che non ci siano più valori nulli
    return df.isnull().sum()

def filter_and_aggregate_data(df, club_id):
    """
    Filtra e aggrega i dati per un club specifico.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        club_id (int): L'ID del club da filtrare.

    Returns:
        pandas.DataFrame: Un DataFrame aggregato contenente le prestazioni del club.
    """
    # Filtra i dati per un club specifico
    filtered_df = df[df['club_id'] == club_id]

    # Aggrega i dati
    team_performance = filtered_df.groupby(['club_id', 'competition_id', 'season']).agg({
        'home_club_goals': 'sum',  # Somma dei goal in casa
        'away_club_goals': 'sum',  # Somma dei goal in trasferta
        'is_win': 'sum'  # Numero di vittorie
    }).reset_index()

    # Calcola il totale dei goal segnati e subiti
    team_performance['total_goals_scored'] = team_performance['home_club_goals'] + team_performance['away_club_goals']
    team_performance['total_goals_conceded'] = filtered_df.groupby(['club_id', 'competition_id', 'season']).agg({
        'opponent_goals': 'sum'  # Somma dei goal subiti
    }).values.flatten()

    # Calcola la differenza reti
    team_performance['goal_difference'] = team_performance['total_goals_scored'] - team_performance['total_goals_conceded']

    return team_performance

def plot_team_performance(team_performance):
    """
    Crea un grafico delle prestazioni della squadra in diverse competizioni.

    Args:
        team_performance (pandas.DataFrame): Un DataFrame contenente le prestazioni della squadra.
    """
    # Creazione del grafico
    fig, ax1 = plt.subplots(figsize=(12, 8))

    # Usa una palette di colori distinti
    colors = list(mcolors.TABLEAU_COLORS.values())

    # Traccia la differenza reti con le barre
    for i, competition in enumerate(team_performance['competition_id'].unique()):
        comp_data = team_performance[team_performance['competition_id'] == competition]
        ax1.bar(comp_data['season'], comp_data['goal_difference'], color=colors[i % len(colors)], alpha=0.6, label=f'Differenza Reti - {competition}')

    # Crea un secondo asse y per le vittorie
    ax2 = ax1.twinx()

    # Traccia le vittorie con le linee
    for i, competition in enumerate(team_performance['competition_id'].unique()):
        comp_data = team_performance[team_performance['competition_id'] == competition]
        ax2.plot(comp_data['season'], comp_data['is_win'], color=colors[(i + len(team_performance['competition_id'].unique())) % len(colors)], label=f'Vittorie - {competition}', marker='o')

    # Impostazione delle etichette e del titolo
    ax1.set_xlabel('Stagione')
    ax1.set_ylabel('Differenza Reti')
    ax2.set_ylabel('Vittorie')
    plt.title('Prestazioni della Squadra in Diverse Competizioni')

    # Aggiunta delle legende
    fig.legend(loc='upper right', bbox_to_anchor=(1, 1), bbox_transform=ax1.transAxes)

def create_violin_plot(df):
    """
    Crea un grafico a violino per la distribuzione dei goal segnati per partita, divisi tra casa e trasferta.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati dei goal.
    """
    # Crea un DataFrame "melted" per i goal in casa e fuori casa
    melted_df = df.melt(id_vars=['season'], value_vars=['home_club_goals', 'away_club_goals'],
                                 var_name='Location', value_name='Goals')

    # Filtra per escludere i valori negativi
    melted_df = melted_df[melted_df['Goals'] >= 0]

    # Creazione del Violin Plot per la distribuzione dei goal
    plt.figure(figsize=(12, 8))  # Imposta la dimensione della figura
    sns.violinplot(x='season', y='Goals', hue='Location', data=melted_df, split=True, inner='quartile')  # Crea il violin plot
    plt.xlabel('Stagione')  # Etichetta dell'asse x
    plt.ylabel('Goal')
    plt.title('Distribuzione dei Goal Segnati per Partita (Casa e Trasferta)')
    plt.legend(title='', loc='upper right')  # Aggiunge la legenda

def create_scatter_matrix(df):
    """
    Crea una matrice di scatter plot per varie metriche.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati da visualizzare.
    """
    # Seleziona le colonne rilevanti
    filtered_df = df[['home_club_goals', 'away_club_goals', 'is_win', 'home_club_position', 'away_club_position']]

    # Escludi i valori 'Unknown' e -1
    filtered_df = filtered_df.loc[(filtered_df['home_club_goals'] != 'Unknown') &
                                (filtered_df['away_club_goals'] != 'Unknown') &
                                (filtered_df['home_club_position'] != -1) &
                                (filtered_df['away_club_position'] != -1)]

    # Creazione della Matrice di Scatter Plot
    sns.pairplot(filtered_df)
    plt.suptitle('Matrice di Scatter Plot di Vari Metriche', y=1.02)

def fill_missing_values_combined_df(df):
    """
    Sostituisce i valori nulli nelle colonne numeriche con -1 e nelle colonne non numeriche con 'Unknown'.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati da riempire.

    Returns:
        pandas.Series: Una serie che indica il numero di valori nulli per colonna dopo il riempimento.
    """
    # Sostituisci i valori nulli nelle colonne numeriche con -1
    for column in df.select_dtypes(include=['float64', 'int64']).columns:
        df[column] = df[column].fillna(-1)

    # Sostituisci i valori nulli nelle colonne non numeriche con 'Unknown'
    for column in df.select_dtypes(include=['object']).columns:
        df[column] = df[column].fillna('Unknown')

    # Verifichiamo che la sostituzione sia avvenuta correttamente
    return df.isnull().sum()

def filter_and_aggregate_player_data(df, player_id, club_id):
    """
    Filtra e aggrega i dati per un giocatore specifico e un club specifico.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        player_id (int): L'ID del giocatore da filtrare.
        club_id (int): L'ID del club da filtrare.

    Returns:
        pandas.DataFrame: Un DataFrame aggregato contenente le metriche di performance del giocatore nelle vittorie.
    """
    # Filtra per un giocatore specifico e club specifico
    filtered_df = df[(df['player_id'] == player_id) & (df['club_id'] == club_id)]

    # Escludi i valori -1
    filtered_df = filtered_df[(filtered_df['goals'] != -1) &
                              (filtered_df['assists'] != -1) &
                              (filtered_df['minutes_played'] != -1) &
                              (filtered_df['is_win'] != -1)]

    # Aggrega le metriche di performance del giocatore nelle vittorie
    player_contributions = filtered_df.groupby(['player_id', 'name', 'season']).agg({
        'goals': 'sum',  # Somma dei goal
        'assists': 'sum',  # Somma degli assist
        'minutes_played': 'sum',  # Somma dei minuti giocati
        'is_win': 'sum'  # Numero di vittorie
    }).reset_index()

    return player_contributions

def plot_player_contributions(player_contributions, club_id):
    """
    Crea un grafico delle contribuzioni del giocatore nelle vittorie.

    Args:
        player_contributions (pandas.DataFrame): Un DataFrame contenente le contribuzioni del giocatore.
        club_id (int): L'ID del club.
    """
    # Creazione del grafico delle Contribuzioni del Giocatore nelle Vittorie
    plt.figure(figsize=(12, 8))  # Imposta la dimensione della figura
    sns.barplot(x='season', y='goals', data=player_contributions, palette='viridis', hue='is_win')  # Crea il barplot

    # Impostazione delle etichette e del titolo del grafico
    plt.xlabel('Stagione')  # Etichetta dell'asse x
    plt.ylabel('Goal')  # Etichetta dell'asse y
    plt.title(f'Goal di {player_contributions["name"].iloc[0]} nelle Partite Vittoriose per il Club {club_id}')  # Titolo del grafico

def filter_and_aggregate_player_season_data(df, player_id):
    """
    Filtra e aggrega i dati per un giocatore specifico per stagione.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        player_id (int): L'ID del giocatore da filtrare.

    Returns:
        pandas.DataFrame: Un DataFrame aggregato contenente le metriche di performance del giocatore per stagione.
    """
    # Filtra i dati per un giocatore specifico
    filtered_df = df[df['player_id'] == player_id]

    # Escludi i valori -1
    filtered_df = filtered_df[(filtered_df['goals'] != -1) &
                              (filtered_df['assists'] != -1) &
                              (filtered_df['home_club_goals'] != -1) &
                              (filtered_df['away_club_goals'] != -1) &
                              (filtered_df['yellow_cards'] != -1) &
                              (filtered_df['red_cards'] != -1)]

    # Aggrega le metriche di performance del giocatore per stagione
    player_season_performance = filtered_df.groupby(['player_id', 'name', 'season']).agg({
        'goals': 'sum',  # Somma dei goal
        'assists': 'sum',  # Somma degli assist
        'home_club_goals': 'sum',  # Somma dei goal segnati in casa
        'away_club_goals': 'sum',  # Somma dei goal segnati in trasferta
        'yellow_cards': 'sum',  # Somma dei cartellini gialli
        'red_cards': 'sum'  # Somma dei cartellini rossi
    }).reset_index()

    return player_season_performance

def plot_player_season_performance(player_season_performance):
    """
    Crea un grafico delle tendenze delle performance del giocatore per stagione.

    Args:
        player_season_performance (pandas.DataFrame): Un DataFrame contenente le performance del giocatore per stagione.
    """
    # Creazione del grafico delle tendenze delle performance del giocatore
    plt.figure(figsize=(12, 8))  # Imposta la dimensione della figura
    sns.lineplot(x='season', y='goals', data=player_season_performance, marker='o', label='Goal')  # Traccia la linea per i goal
    sns.lineplot(x='season', y='assists', data=player_season_performance, marker='o', label='Assist')  # Traccia la linea per gli assist
    sns.lineplot(x='season', y='yellow_cards', data=player_season_performance, marker='o', label='Cartellini Gialli', color='yellow')  # Traccia la linea per i cartellini gialli
    sns.lineplot(x='season', y='red_cards', data=player_season_performance, marker='o', label='Cartellini Rossi', color='red')  # Traccia la linea per i cartellini rossi

    # Impostazione delle etichette e del titolo del grafico
    plt.xlabel('Stagione')  # Etichetta dell'asse x
    plt.ylabel('Metriche di Performance')  # Etichetta dell'asse y
    plt.title(f'Tendenze delle Performance di {player_season_performance["name"].iloc[0]} nel Tempo')

    # Aggiunta della legenda
    plt.legend(loc='upper left')  # Posiziona la legenda nell'angolo in alto a sinistra

def fill_missing_values_game_lineups_events(df):
    """
    Sostituisce i valori nulli nelle colonne numeriche con -1 e nelle colonne non numeriche con 'Unknown'.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati da riempire.

    Returns:
        pandas.Series: Una serie che indica il numero di valori nulli per colonna dopo il riempimento.
    """
    # Sostituisci i valori nulli nelle colonne numeriche con -1
    for column in df.select_dtypes(include=['float64', 'int64']).columns:
        df[column] = df[column].fillna(-1)

    # Sostituisci i valori nulli nelle colonne non numeriche con 'Unknown'
    for column in df.select_dtypes(include=['object']).columns:
        df[column] = df[column].fillna('Unknown')

    # Verifichiamo che la sostituzione sia avvenuta correttamente
    return df.isnull().sum()

def filter_and_aggregate_player_events(df, player_id):
    """
    Filtra e aggrega gli eventi di un giocatore specifico per posizione e tipo di evento.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati degli eventi.
        player_id (int): L'ID del giocatore da filtrare.

    Returns:
        pandas.DataFrame: Un DataFrame aggregato contenente gli eventi del giocatore per posizione e tipo.
    """
    # Filtra per un giocatore specifico
    player_events = df[df['player_id'] == player_id]

    # Escludi i valori "Unknown" nella colonna type_y
    player_events = player_events[player_events['type_y'] != 'Unknown']

    # Aggrega gli eventi del giocatore per posizione e tipo
    player_event_summary = player_events.groupby(['position', 'type_y']).size().unstack(fill_value=0).reset_index()

    return player_event_summary

def plot_player_event_summary(player_event_summary, player_name):
    """
    Crea un grafico a barre per visualizzare l'impatto del giocatore in diverse posizioni.

    Args:
        player_event_summary (pandas.DataFrame): Un DataFrame contenente il riepilogo degli eventi del giocatore.
        player_name (str): Il nome del giocatore.
    """
    # Traccia gli eventi del giocatore per posizione
    plt.figure(figsize=(14, 10))
    sns.barplot(data=player_event_summary.melt(id_vars='position'), x='position', y='value', hue='type_y')
    plt.xlabel('Posizione')
    plt.ylabel('Numero di Eventi')
    plt.title(f'Impatto del Giocatore {player_name} in Diverse Posizioni')
    plt.legend(title='Tipo di Evento', bbox_to_anchor=(1.05, 1), loc='upper left')

def fill_missing_values_player_valuations_clubs(df):
    """
    Sostituisce i valori nulli nelle colonne numeriche con -1 e nelle colonne non numeriche con 'Unknown'.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati da riempire.

    Returns:
        pandas.Series: Una serie che indica il numero di valori nulli per colonna dopo il riempimento.
    """
    # Sostituisci i valori nulli nelle colonne numeriche con -1
    for column in df.select_dtypes(include=['float64', 'int64']).columns:
        df[column] = df[column].fillna(-1)

    # Sostituisci i valori nulli nelle colonne non numeriche con 'Unknown'
    for column in df.select_dtypes(include=['object']).columns:
        df[column] = df[column].fillna('Unknown')

    # Verifichiamo che la sostituzione sia avvenuta correttamente
    return df.isnull().sum()

def plot_player_valuation_trends(df, club_id, player_ids, club_name):
    """
    Crea un grafico delle tendenze di valutazione per i giocatori specificati nel club.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati delle valutazioni.
        club_id (int): L'ID del club.
        player_ids (list): Una lista di ID dei giocatori da tracciare.
        club_name (str): Il nome del club.
    """
    # Crea il grafico delle tendenze di valutazione per i giocatori specificati nel club
    plt.figure(figsize=(12, 8))

    for player_id in player_ids:
        # Filtra i dati per il club e il giocatore specificato
        player_valuations_filtered = df[
            (df['club_id'] == club_id) &
            (df['player_id'] == player_id)
            ].copy()

        # Escludi i dati con -1 per market_value_in_eur e "Unknown" per name_y
        player_valuations_filtered = player_valuations_filtered[
            (player_valuations_filtered['market_value_in_eur'] != -1) &
            (player_valuations_filtered['name_y'] != 'Unknown')
            ]

        # Assicurati che la colonna datetime sia nel formato datetime
        player_valuations_filtered['datetime'] = pd.to_datetime(player_valuations_filtered['datetime'])

        # Verifica se la colonna name_y è presente e non vuota
        if not player_valuations_filtered['name_y'].empty:
            player_name = player_valuations_filtered['name_y'].iloc[0]
        else:
            player_name = f'Giocatore {player_id}'

        # Traccia le valutazioni di mercato nel tempo per il giocatore
        plt.plot(player_valuations_filtered['datetime'], player_valuations_filtered['market_value_in_eur'], marker='o',
                 label=player_name)

    # Imposta le etichette e il titolo del grafico in italiano, includendo il nome del club
    plt.xlabel('Data')
    plt.ylabel('Valore di Mercato (EUR)')
    plt.title(f'Tendenze di Valutazione dei Giocatori nel Club {club_name}')
    plt.legend()

def geocode_stadium(stadium_name):
    """
    Geocodifica il nome di uno stadio per ottenere le coordinate latitudine e longitudine.

    Args:
        stadium_name (str): Il nome dello stadio da geocodificare.

    Returns:
        pandas.Series: Una serie contenente la latitudine e la longitudine dello stadio.
    """
    geolocator = Nominatim(user_agent="club_stadiums")
    try:
        location = geolocator.geocode(stadium_name)
        if location:
            return pd.Series([location.latitude, location.longitude])
        else:
            return pd.Series([None, None])
    except Exception as e:
        # Se si verifica un errore durante la geocodifica, restituisce valori nulli
        return pd.Series([None, None])

def geocode_club_stadiums(clubs):
    """
    Geocodifica i nomi degli stadi dei club per ottenere le coordinate latitudine e longitudine.

    Args:
        clubs (pandas.DataFrame): Il DataFrame contenente i dati dei club, incluso il nome dello stadio.

    Returns:
        pandas.DataFrame: Un DataFrame contenente i club con le coordinate latitudine e longitudine degli stadi.
    """
    # Applica la geocodifica ai nomi degli stadi con limitazione della velocità
    clubs[['latitude', 'longitude']] = clubs['stadium_name'].apply(geocode_stadium)
    time.sleep(1)  # Per evitare di superare il limite di velocità del servizio di geocodifica

    # Filtra i club senza coordinate
    clubs = clubs.dropna(subset=['latitude', 'longitude'])

    return clubs

def create_stadium_map(clubs):
    """
    Crea una mappa interattiva dei club e dei loro stadi utilizzando Folium.

    Args:
        clubs (pandas.DataFrame): Il DataFrame contenente i dati dei club con le coordinate degli stadi.

    Returns:
        folium.Map: Una mappa interattiva contenente i marker per gli stadi dei club.
    """
    # Crea un GeoDataFrame
    geometry = [Point(xy) for xy in zip(clubs['longitude'], clubs['latitude'])]
    gdf = gpd.GeoDataFrame(clubs, geometry=geometry)

    # Inizializza una mappa di Folium
    m = folium.Map(location=[20, 0], zoom_start=2)

    # Aggiungi gli stadi dei club alla mappa
    for idx, row in gdf.iterrows():
        folium.Marker(
            location=[row['latitude'], row['longitude']],
            popup=row['stadium_name'],
            icon=folium.Icon(color='blue', icon='info-sign')
        ).add_to(m)

    return m
