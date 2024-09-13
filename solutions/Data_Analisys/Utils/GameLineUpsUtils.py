import matplotlib.pyplot as plt
import seaborn as sns

def autopct_format(values):
    """
    Crea una funzione per formattare le percentuali nella torta, evitando di mostrare quelle minori di 1.

    Args:
        values (list): Lista dei valori per calcolare le percentuali.

    Returns:
        function: Funzione che formatta le percentuali.
    """
    def my_format(pct):
        total = sum(values)
        val = int(round(pct * total / 100.0))
        return '' if pct < 1 else f'{pct:.1f}%'
    return my_format

def plot_position_distribution(position_counts):
    """
    Crea un grafico a torta per visualizzare la distribuzione delle posizioni dei giocatori con etichette migliorate e colori accesi.

    Args:
        position_counts (pandas.Series): Serie contenente il conteggio delle posizioni dei giocatori.
    """
    plt.figure(figsize=(10, 15))
    plt.pie(position_counts, labels=None, autopct=autopct_format(position_counts), startangle=140, colors=sns.color_palette('Set1'))
    # Aggiungi la legenda
    plt.legend(position_counts.index, bbox_to_anchor=(1.05, 1), loc='upper left')  # Posiziona la legenda a destra del grafico
    plt.title('Distribuzione dei Giocatori per Posizione')
    plt.show()  # Mostra il grafico
