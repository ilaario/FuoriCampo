import matplotlib.pyplot as plt

def plot_top_teams_scatter(data, title, xlabel, ylabel, color, label):
    """
    Crea un grafico a dispersione per visualizzare i dati delle squadre top.

    Args:
        data (pandas.Series): Serie contenente i dati da visualizzare. L'indice dovrebbe rappresentare le squadre.
        title (str): Il titolo del grafico.
        xlabel (str): L'etichetta dell'asse x.
        ylabel (str): L'etichetta dell'asse y.
        color (str): Il colore dei punti nel grafico.
        label (str): L'etichetta della legenda per i punti nel grafico.
    """
    plt.figure(figsize=(20, 6))
    plt.scatter(data.index, data.values, color=color, label=label, s=100)
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.xticks(rotation=45)
    plt.legend()
    plt.grid(True)
    plt.show()
