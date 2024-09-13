import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def filter_top_clubs(df, column, top_n=20):
    """
    Filtra i dati per ottenere i top club in base al numero di record per una colonna specifica.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        column (str): Il nome della colonna per filtrare i dati (ad esempio, 'type').
        top_n (int, opzionale): Il numero di top club da selezionare. Default è 20.

    Returns:
        tuple: Un tuple contenente il DataFrame filtrato e un indice dei top club.
    """
    # Filtra i dati per includere solo i record con il tipo specificato
    filtered_df = df[df['type'] == column]

    # Ottieni i top n club per numero di record
    top_clubs = filtered_df['club_id'].value_counts().nlargest(top_n).index

    return filtered_df, top_clubs

def load_clubs_data(filepath):
    """
    Carica i dati dei club da un file CSV.

    Args:
        filepath (str): Il percorso del file CSV contenente i dati dei club.

    Returns:
        pandas.DataFrame: Un DataFrame contenente i dati dei club.
    """
    return pd.read_csv(filepath)

def merge_club_names(df, clubs_df):
    """
    Unisce i dati principali con i dati dei club per ottenere i nomi dei club.

    Args:
        df (pandas.DataFrame): Il DataFrame principale contenente i dati.
        clubs_df (pandas.DataFrame): Il DataFrame contenente i dati dei club.

    Returns:
        pandas.DataFrame: Un DataFrame unito con i nomi dei club.
    """
    return df.merge(clubs_df[['club_id', 'name']], on='club_id', how='left')

def filter_top_club_data(df, top_clubs):
    """
    Filtra i dati per includere solo i record dei top club.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        top_clubs (pandas.Index): Un indice contenente i top club.

    Returns:
        pandas.DataFrame: Un DataFrame filtrato per includere solo i record dei top club.
    """
    return df[df['club_id'].isin(top_clubs)]

def create_bar_chart(data, x_column, title, xlabel, ylabel, rotation=90):
    """
    Crea un grafico a barre per visualizzare la distribuzione dei dati.

    Args:
        data (pandas.DataFrame): Il DataFrame contenente i dati da visualizzare.
        x_column (str): Il nome della colonna da utilizzare per l'asse x.
        title (str): Il titolo del grafico.
        xlabel (str): L'etichetta dell'asse x.
        ylabel (str): L'etichetta dell'asse y.
        rotation (int, opzionale): L'angolo di rotazione per le etichette dell'asse x. Default è 90.
    """
    plt.figure(figsize=(12, 6))
    sns.countplot(data=data, x=x_column)
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.xticks(rotation=rotation)
    plt.show()

def create_goals_evolution_chart(data, date_column='date'):
    """
    Crea un grafico dell'evoluzione del numero di goal per anno.

    Args:
        data (pandas.DataFrame): Il DataFrame contenente i dati.
        date_column (str, opzionale): Il nome della colonna contenente le date. Default è 'date'.
    """
    data['year'] = data[date_column].dt.year
    plt.figure(figsize=(12, 6))
    sns.countplot(data=data, x='year')
    plt.title('Evoluzione del Numero di Goal per Anno')
    plt.xlabel('Anno')
    plt.ylabel('Numero di Goal')
    plt.xticks(rotation=45)
    plt.show()
