import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd

def plot_market_value_histogram(df, max_value=1e6):
    """
    Crea un istogramma per visualizzare la distribuzione del valore di mercato.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        max_value (float, opzionale): Il valore massimo per filtrare i dati. Default è 1e6.
    """
    filtered_data = df[df['market_value_in_eur'] <= max_value]['market_value_in_eur']
    plt.figure(figsize=(10, 6))
    filtered_data.hist(bins=100, color='skyblue')
    plt.title('Distribuzione del Valore di Mercato', fontsize=16)
    plt.xlabel('Valore di Mercato (EUR)', fontsize=14)
    plt.ylabel('Frequenza', fontsize=14)
    plt.show()

def plot_market_value_kde(df, max_value=1e6):
    """
    Crea un grafico KDE per visualizzare l'andamento continuo del valore di mercato.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.
        max_value (float, opzionale): Il valore massimo per filtrare i dati. Default è 1e6.
    """
    filtered_data = df[df['market_value_in_eur'] <= max_value]['market_value_in_eur']
    plt.figure(figsize=(10, 6))
    sns.kdeplot(filtered_data, color='red', lw=2)
    plt.title('Andamento Continuo del Valore di Mercato', fontsize=16)
    plt.xlabel('Valore di Mercato (EUR)', fontsize=14)
    plt.ylabel('Densità', fontsize=14)
    plt.show()

def calculate_average_market_values(df):
    """
    Calcola il valore di mercato medio per ciascun club e seleziona i primi 15 club.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.

    Returns:
        pandas.DataFrame: Un DataFrame contenente i top 15 club e il loro valore di mercato medio.
    """
    average_market_values = df.groupby('current_club_id')['market_value_in_eur'].mean()
    top_15_clubs = average_market_values.sort_values(ascending=False).head(15)
    top_15_clubs_df = top_15_clubs.reset_index()
    return top_15_clubs_df

def merge_with_club_names(top_15_clubs_df, clubs_df_path='../Datasets/clubs.csv'):
    """
    Unisce i dati dei valori di mercato medi con i dati dei club per ottenere i nomi dei club.

    Args:
        top_15_clubs_df (pandas.DataFrame): Il DataFrame contenente i top 15 club e il loro valore di mercato medio.
        clubs_df_path (str, opzionale): Il percorso del file CSV dei club. Default è '../Datasets/clubs.csv'.

    Returns:
        pandas.DataFrame: Un DataFrame contenente i top 15 club con i loro nomi e valore di mercato medio.
    """
    clubs_df = pd.read_csv(clubs_df_path)
    top_15_clubs_df = top_15_clubs_df.merge(clubs_df[['club_id', 'name']], left_on='current_club_id', right_on='club_id', how='left')
    return top_15_clubs_df

def plot_top_15_clubs_market_value(top_15_clubs_df):
    """
    Crea un grafico a barre per i valori di mercato medi dei primi 15 club.

    Args:
        top_15_clubs_df (pandas.DataFrame): Il DataFrame contenente i top 15 club con i loro nomi e valore di mercato medio.
    """
    plt.figure(figsize=(14, 8))
    sns.barplot(x='name', y='market_value_in_eur', data=top_15_clubs_df, palette='viridis', hue='market_value_in_eur')
    plt.title('Valore di Mercato Medio dei Primi 15 Club')
    plt.xlabel('Nome del Club')
    plt.ylabel('Valore di Mercato Medio (in EUR)')
    plt.xticks(rotation='vertical')
    plt.grid(True)

def calculate_competition_market_values(df):
    """
    Calcola il valore di mercato medio per ciascuna competizione domestica.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati.

    Returns:
        pandas.DataFrame: Un DataFrame contenente le competizioni domestiche e il loro valore di mercato medio.
    """
    competition_market_values = df.groupby('player_club_domestic_competition_id')['market_value_in_eur'].mean().sort_values(ascending=False).reset_index()
    return competition_market_values

def plot_competition_market_values(competition_market_values):
    """
    Crea un grafico a punti con linea di tendenza per visualizzare il valore di mercato per competizione domestica.

    Args:
        competition_market_values (pandas.DataFrame): Un DataFrame contenente le competizioni domestiche e il loro valore di mercato medio.
    """
    plt.figure(figsize=(12, 8))
    dotplot = sns.scatterplot(x='market_value_in_eur', y='player_club_domestic_competition_id', data=competition_market_values, palette="viridis", hue='player_club_domestic_competition_id', s=100, legend=False)
    lineplot = sns.lineplot(x='market_value_in_eur', y='player_club_domestic_competition_id', data=competition_market_values, color='grey', errorbar=None)
    dotplot.set_title('Valore di Mercato per Competizione Domestica', fontsize=16)
    dotplot.set_xlabel('Valore di Mercato Medio (EUR)', fontsize=14)
    dotplot.set_ylabel('ID Competizione', fontsize=14)

    for index, row in competition_market_values.iterrows():
        plt.text(row['market_value_in_eur'], index, f'{row["market_value_in_eur"]:,.0f}', va='center', fontsize=10, color='black')

def apply_log_transformation(df):
    df['log_market_value_in_eur'] = np.log1p(df['market_value_in_eur'])
    return df

def calculate_quartiles(df):
    Q1 = df['market_value_in_eur'].quantile(0.25)
    Q3 = df['market_value_in_eur'].quantile(0.75)
    Q2 = df['market_value_in_eur'].median()

    Q1_log = np.log1p(Q1)
    Q3_log = np.log1p(Q3)
    Q2_log = np.log1p(Q2)

    return Q1_log, Q2_log, Q3_log, Q1, Q2, Q3

def plot_violin_log_transformed(df, Q1_log, Q2_log, Q3_log, Q1, Q2, Q3):
    plt.figure(figsize=(10, 6))
    violinplot = sns.violinplot(x=df['log_market_value_in_eur'], inner='quartile')
    violinplot.set_title('Violin Plot del Valore di Mercato', fontsize=16)
    violinplot.set_xlabel('Logaritmo del Valore di Mercato (EUR)', fontsize=14)

    plt.axvline(Q1_log, color='r', linestyle='--', label=f'Q1 (25° percentile) ≈ {int(Q1)} EUR')
    plt.axvline(Q2_log, color='g', linestyle='--', label=f'Mediana (50° percentile) ≈ {int(Q2)} EUR')
    plt.axvline(Q3_log, color='b', linestyle='--', label=f'Q3 (75° percentile) ≈ {int(Q3)} EUR')

    # Annotare i valori originali sui quartili
    plt.text(Q1_log, 0.02, f'{int(Q1)} EUR', color='r', va='bottom', ha='right', rotation=90)
    plt.text(Q2_log, 0.02, f'{int(Q2)} EUR', color='g', va='bottom', ha='right', rotation=90)
    plt.text(Q3_log, 0.02, f'{int(Q3)} EUR', color='b', va='bottom', ha='right', rotation=90)

    plt.legend()
    plt.show()