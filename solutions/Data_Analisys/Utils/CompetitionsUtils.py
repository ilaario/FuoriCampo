import matplotlib.pyplot as plt
import geopandas as gpd

def create_pie_chart(grouped_counts, color_mapping):
    """
    Crea un grafico a torta per visualizzare la distribuzione delle competizioni per paese.

    Args:
        grouped_counts (pandas.Series): Serie contenente il conteggio delle competizioni per paese.
        color_mapping (dict): Dizionario che mappa i conteggi a colori specifici.

    Returns:
        tuple: Un tuple contenente gli oggetti wedges, texts, autotexts del grafico a torta.
    """
    plt.figure(figsize=(10, 6))
    wedges, texts, autotexts = plt.pie(
        grouped_counts,
        labels=grouped_counts.index,
        autopct='%1.1f%%',
        colors=[color_mapping[count] for count in grouped_counts.index]
    )
    plt.title('Distribuzione dei Paesi per Numero di Competizioni')
    plt.axis('equal')
    return wedges, texts, autotexts

def create_legend(country_counts, grouped_counts, color_mapping):
    """
    Crea una legenda per il grafico a torta basata sui conteggi delle competizioni per paese.

    Args:
        country_counts (pandas.Series): Serie contenente il conteggio delle competizioni per paese.
        grouped_counts (pandas.Series): Serie contenente il conteggio raggruppato delle competizioni.
        color_mapping (dict): Dizionario che mappa i conteggi a colori specifici.
    """
    legend_labels = []
    for count in grouped_counts.index:
        countries = country_counts[country_counts == count].index.tolist()
        for country in countries:
            legend_labels.append(f'{country} ({count})')

    country_color_mapping = {country: color_mapping[country_counts[country]] for country in country_counts.index}
    handles = [plt.Line2D([0], [0], marker='o', color='w', label=label, markersize=10, markerfacecolor=country_color_mapping[label.split(' (')[0]]) for label in legend_labels]
    plt.legend(handles, legend_labels, title="Paesi", loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))

def plot_country_distribution(grouped_counts, country_counts, color_mapping):
    """
    Crea e visualizza un grafico a torta con legenda per la distribuzione delle competizioni per paese.

    Args:
        grouped_counts (pandas.Series): Serie contenente il conteggio raggruppato delle competizioni.
        country_counts (pandas.Series): Serie contenente il conteggio delle competizioni per paese.
        color_mapping (dict): Dizionario che mappa i conteggi a colori specifici.
    """
    create_pie_chart(grouped_counts, color_mapping)
    create_legend(country_counts, grouped_counts, color_mapping)
    plt.show()

def load_europe_map():
    """
    Carica la mappa del mondo e filtra per includere solo l'Europa.

    Returns:
        geopandas.GeoDataFrame: Un GeoDataFrame contenente la mappa dell'Europa.
    """
    # Carica la mappa del mondo
    world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))
    # Filtra il DataFrame del mondo per includere solo l'Europa
    europe = world[world['continent'] == 'Europe']
    return europe

def plot_competition_distribution(europe, country_counts):
    """
    Unisce la mappa dell'Europa con i conteggi delle competizioni per paese e visualizza la distribuzione.

    Args:
        europe (geopandas.GeoDataFrame): Un GeoDataFrame contenente la mappa dell'Europa.
        country_counts (pandas.Series): Serie contenente il conteggio delle competizioni per paese.
    """
    # Rinomina la colonna nel DataFrame country_counts
    country_counts = country_counts.rename('competition_count')
    # Unisci la mappa dell'Europa con il DataFrame country_counts
    merged = europe.set_index('name').join(country_counts)
    # Disegna la mappa
    fig, ax = plt.subplots(1, 1, figsize=(15, 10))
    merged.plot(column='competition_count', ax=ax, legend=True, cmap='OrRd', missing_kwds={"color": "lightgrey"})
    plt.title('Distribuzione delle Competizioni per Paese in Europa')
    plt.show()
