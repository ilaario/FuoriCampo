import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

def plot_cards_distribution(df):
    """
    Crea grafici a barre e a violino per visualizzare la distribuzione dei cartellini gialli e rossi ricevuti.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati dei cartellini. Deve contenere almeno le colonne 'yellow_cards' e 'red_cards'.
    """
    # Creazione dei subplot
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))

    # Grafico a barre per i cartellini gialli
    sns.histplot(df['yellow_cards'], bins=10, color='yellow', label='Cartellini Gialli', kde=False, ax=axes[0, 0])
    axes[0, 0].set_title('Distribuzione dei Cartellini Gialli')
    axes[0, 0].set_xlabel('Numero di Cartellini')
    axes[0, 0].set_ylabel('Frequenza')
    axes[0, 0].legend()

    # Grafico a barre per i cartellini rossi
    sns.histplot(df['red_cards'], bins=10, color='red', label='Cartellini Rossi', kde=False, ax=axes[0, 1])
    axes[0, 1].set_title('Distribuzione dei Cartellini Rossi')
    axes[0, 1].set_xlabel('Numero di Cartellini')
    axes[0, 1].set_ylabel('Frequenza')
    axes[0, 1].legend()

    # Grafico a violino per i cartellini gialli
    sns.violinplot(x=df['yellow_cards'], color='yellow', ax=axes[1, 0])
    axes[1, 0].set_title('Distribuzione dei Cartellini Gialli')
    axes[1, 0].set_xlabel('Numero di Cartellini')

    # Grafico a violino per i cartellini rossi
    sns.violinplot(x=df['red_cards'], color='red', ax=axes[1, 1])
    axes[1, 1].set_title('Distribuzione dei Cartellini Rossi')
    axes[1, 1].set_xlabel('Numero di Cartellini')

    # Impostazione del titolo generale
    fig.suptitle('Distribuzione dei Cartellini Gialli e Rossi', fontsize=16)

    # Mostra il grafico
    plt.tight_layout()
    plt.show()


def plot_card_analysis(df):
    """
    Crea un grafico a linee per visualizzare la somma dei cartellini gialli e rossi per data,
    insieme alla media mobile di 30 giorni e alla media complessiva.

    Args:
        df (pandas.DataFrame): Il DataFrame contenente i dati dei cartellini. Deve contenere le colonne 'yellow_cards', 'red_cards' e 'date'.
    """
    # Calcolare la somma dei cartellini gialli e rossi per data
    df['yellow_red'] = df['yellow_cards'] + df['red_cards']
    df['date'] = pd.to_datetime(df['date'])  # Converte la colonna 'date' in formato datetime
    card_counts = df.groupby('date')['yellow_red'].sum().reset_index()

    # Applica una media mobile di 30 giorni
    card_counts['rolling_avg'] = card_counts['yellow_red'].rolling(window=30).mean()

    # Calcolare la media complessiva dei cartellini
    overall_mean = card_counts['yellow_red'].mean()

    plt.figure(figsize=(14, 8))
    # Crea un grafico a linee per la media mobile dei cartellini
    sns.lineplot(x='date', y='rolling_avg', data=card_counts, label='Media Mobile (30 giorni)')
    # Crea una linea orizzontale per la media complessiva dei cartellini
    plt.axhline(overall_mean, color='red', linestyle='--', label='Media Generale')
    plt.title('Frequenza dei Cartellini per Data (Media Mobile di 30 Giorni)')
    plt.xlabel('Data')
    plt.ylabel('Media Mobile dei Cartellini')

    # Modifica delle etichette dell'asse x per mostrare solo le date di inizio anno
    start_years = card_counts['date'][card_counts['date'].dt.strftime('%m-%d') == '01-01']
    plt.xticks(start_years, start_years.dt.strftime('%Y-%m-%d'), rotation=45)
