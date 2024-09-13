import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
from geopy.geocoders import Nominatim
import folium
from folium.plugins import MarkerCluster

def drop_column(df, column_name):
    """
    Elimina la colonna specificata dal DataFrame.

    Args:
        df (pandas.DataFrame): Il DataFrame da cui eliminare la colonna.
        column_name (str): Il nome della colonna da eliminare.

    Returns:
        pandas.DataFrame: Il DataFrame senza la colonna specificata.
    """
    df = df.drop(column_name, axis=1)
    if column_name in df.columns:
        print(f"La colonna '{column_name}' è presente nel DataFrame.")
    else:
        print(f"La colonna '{column_name}' non è presente nel DataFrame.")
    return df

def fill_missing_values_columns(df):
    """
    Riempie i valori nulli in specifiche colonne del DataFrame con 'Unknown' o -1.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati da riempire.

    Returns:
        pandas.Series: Una serie che indica il numero di valori nulli per colonna dopo il riempimento.
    """
    columns_unknown = ['first_name', 'last_name', 'name', 'player_code', 'country_of_birth', 'city_of_birth', 'country_of_citizenship', 'date_of_birth', 'sub_position', 'position', 'foot', 'contract_expiration_date', 'agent_name', 'image_url', 'url', 'current_club_domestic_competition_id', 'current_club_name']
    columns_minus_one = ['height_in_cm', 'market_value_in_eur', 'highest_market_value_in_eur']

    for column in columns_unknown:
        df[column] = df[column].fillna('Unknown')

    for column in columns_minus_one:
        df[column] = df[column].fillna(-1)

    return df.isnull().sum()

def filter_values(df):
    """
    Esclude i valori 'Unknown' dalle colonne 'position' e 'current_club_name'.

    Args:
        df (pandas.DataFrame): Il DataFrame da filtrare.

    Returns:
        pandas.DataFrame: Il DataFrame filtrato.
    """
    df = df.loc[(df['position'] != 'Unknown') & (df['current_club_name'] != 'Unknown')]
    return df

def calculate_market_value_by_club(df, top_n_clubs=20):
    """
    Calcola il valore di mercato medio per ogni club e seleziona i top club.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        top_n_clubs (int, opzionale): Il numero di top club da selezionare. Default è 20.

    Returns:
        pandas.Series: Serie contenente i top club e il loro valore di mercato medio.
    """
    market_value_by_club = df.groupby('current_club_name')['market_value_in_eur'].mean().sort_values(ascending=False)
    top_clubs = market_value_by_club.head(top_n_clubs)
    return top_clubs

def plot_market_value_by_club(top_clubs):
    """
    Crea un grafico a barre per visualizzare il valore di mercato medio dei top club.

    Args:
        top_clubs (pandas.Series): Serie contenente i top club e il loro valore di mercato medio.
    """
    plt.figure(figsize=(12, 8))
    top_clubs.plot(kind='barh', color='blue')
    plt.title('Confronto tra Club e Valore di Mercato Medio (Top 20 Club)')
    plt.xlabel('Valore di Mercato Medio (EUR)')
    plt.ylabel('Club')
    plt.gca().invert_yaxis()

def prepare_contingency_table(df, top_n=20):
    """
    Prepara una tabella di contingenza per la nascita e la cittadinanza dei giocatori.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        top_n (int, opzionale): Il numero di top paesi da selezionare. Default è 20.

    Returns:
        pandas.DataFrame: Una tabella di contingenza con i paesi di nascita e cittadinanza dei giocatori.
    """
    df = df.loc[(df['country_of_birth'] != 'Unknown') & (df['country_of_citizenship'] != 'Unknown')]

    birth_counts = df['country_of_birth'].value_counts()
    citizenship_counts = df['country_of_citizenship'].value_counts()

    total_counts = (birth_counts + citizenship_counts).sort_values(ascending=False)

    top_countries = total_counts.head(top_n).index

    filtered_df = df[df['country_of_birth'].isin(top_countries) & df['country_of_citizenship'].isin(top_countries)]

    birth_vs_citizenship = pd.crosstab(filtered_df['country_of_birth'], filtered_df['country_of_citizenship'])

    return birth_vs_citizenship

def prepare_geo_dataframe(df):
    """
    Prepara un GeoDataFrame con il numero di giocatori per nazione.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.

    Returns:
        geopandas.GeoDataFrame: Un GeoDataFrame con il numero di giocatori per nazione.
    """
    df = df.loc[df['country_of_birth'] != 'Unknown']

    world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

    df['country'] = df['country_of_birth']

    players_per_country = df['country_of_birth'].value_counts().reset_index()
    players_per_country.columns = ['country', 'count']

    geo_df = world.merge(players_per_country, how="left", left_on="name", right_on="country")

    geo_df['count'] = geo_df['count'].fillna(0)

    return geo_df

def plot_geo_map(geo_df):
    """
    Crea una mappa geografica per visualizzare il numero di giocatori per nazione.

    Args:
        geo_df (geopandas.GeoDataFrame): Un GeoDataFrame con il numero di giocatori per nazione.
    """
    fig, ax = plt.subplots(1, 1, figsize=(15, 10))
    geo_df.plot(column='count', ax=ax, legend=True,
                legend_kwds={'label': "Number of Players Born",
                             'orientation': "horizontal"},
                cmap='OrRd')
    plt.show()

def filter_unknown_countries(df):
    """
    Esclude i valori 'Unknown' dalla colonna 'country_of_birth'.

    Args:
        df (pandas.DataFrame): Il DataFrame da filtrare.

    Returns:
        pandas.DataFrame: Il DataFrame filtrato.
    """
    return df.loc[df['country_of_birth'] != 'Unknown']

def count_players_by_country(df):
    """
    Conta il numero di giocatori per nazione.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.

    Returns:
        pandas.DataFrame: Un DataFrame con il numero di giocatori per nazione.
    """
    country_counts = df['country_of_birth'].value_counts().reset_index()
    country_counts.columns = ['country', 'count']
    return country_counts

def calculate_club_counts(df, top_n_clubs=30):
    """
    Calcola il numero di giocatori per club e seleziona i top club.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        top_n_clubs (int, opzionale): Il numero di top club da selezionare. Default è 30.

    Returns:
        pandas.Index: Un indice dei top club.
    """
    club_counts = df['current_club_name'].value_counts()
    top_clubs = club_counts.head(top_n_clubs).index
    return top_clubs

def create_contingency_table(df, top_clubs):
    """
    Crea una tabella di contingenza per la distribuzione dei giocatori per club e posizione.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        top_clubs (pandas.Index): Un indice dei top club.

    Returns:
        pandas.DataFrame: Una tabella di contingenza con la distribuzione dei giocatori per club e posizione.
    """
    filtered_df = df[df['current_club_name'].isin(top_clubs)]
    position_club = pd.crosstab(filtered_df['current_club_name'], filtered_df['position'])
    return position_club

def plot_position_club(position_club):
    """
    Crea un grafico a barre per visualizzare il numero di giocatori per club e posizione.

    Args:
        position_club (pandas.DataFrame): Una tabella di contingenza con la distribuzione dei giocatori per club e posizione.
    """
    position_club.plot(kind='bar', stacked=True, figsize=(15, 10))
    plt.title('Numero di Giocatori per Club e Posizione (Top 30 Club)')
    plt.xlabel('Club')
    plt.ylabel('Numero di Giocatori')
    plt.xticks(rotation=90)

def get_country_coordinates(country, geolocator):
    """
    Ottiene le coordinate di una nazione utilizzando un geolocator.

    Args:
        country (str): Il nome della nazione.
        geolocator (geopy.geocoders.Nominatim): Un oggetto geolocator.

    Returns:
        tuple: Una tupla contenente la latitudine e la longitudine della nazione.
    """
    try:
        location = geolocator.geocode(country)
        if location:
            return (location.latitude, location.longitude)
        else:
            return (None, None)
    except:
        return (None, None)

def add_coordinates_to_countries(country_counts):
    """
    Aggiunge le coordinate al DataFrame delle nazioni.

    Args:
        country_counts (pandas.DataFrame): Il DataFrame contenente il numero di giocatori per nazione.

    Returns:
        pandas.DataFrame: Un DataFrame con le coordinate delle nazioni.
    """
    geolocator = Nominatim(user_agent="player_locator")
    country_counts['coordinates'] = country_counts['country'].apply(lambda x: get_country_coordinates(x, geolocator))
    country_counts['latitude'] = country_counts['coordinates'].apply(lambda x: x[0] if x else None)
    country_counts['longitude'] = country_counts['coordinates'].apply(lambda x: x[1] if x else None)
    return country_counts

def create_folium_map(country_counts):
    """
    Crea una mappa Folium per visualizzare la distribuzione dei giocatori per nazione.

    Args:
        country_counts (pandas.DataFrame): Il DataFrame contenente il numero di giocatori per nazione e le loro coordinate.

    Returns:
        folium.Map: Una mappa Folium con i marker per le nazioni.
    """
    map_countries = folium.Map(location=[20, 0], zoom_start=2)
    marker_cluster = MarkerCluster().add_to(map_countries)

    for i, row in country_counts.iterrows():
        if pd.notnull(row['latitude']) and pd.notnull(row['longitude']):
            folium.CircleMarker(
                location=[row['latitude'], row['longitude']],
                radius=row['count'] / 10,
                popup=f"{row['country']}: {row['count']} players",
                color='blue',
                fill=True,
                fill_color='blue',
                fill_opacity=0.4
            ).add_to(marker_cluster)
    return map_countries
