import matplotlib.pyplot as plt
import geopandas as gpd


def create_pie_chart(grouped_counts, color_mapping):
    """
    Create a pie chart to visualize the distribution of competitions by country.

    Args:
        grouped_counts (pandas.Series): Series containing the count of competitions per country.
        color_mapping (dict): Dictionary mapping the counts to specific colors.

    Returns:
        tuple: A tuple containing the wedges, texts, and autotexts objects of the pie chart.
    """
    plt.figure(figsize=(10, 6))
    wedges, texts, autotexts = plt.pie(
        grouped_counts,
        labels=grouped_counts.index,
        autopct='%1.1f%%',
        colors=[color_mapping[count] for count in grouped_counts.index]
    )
    plt.title('Distribution of Countries by Number of Competitions')
    plt.axis('equal')
    return wedges, texts, autotexts


def create_legend(country_counts, grouped_counts, color_mapping):
    """
    Create a legend for the pie chart based on the counts of competitions by country.

    Args:
        country_counts (pandas.Series): Series containing the count of competitions per country.
        grouped_counts (pandas.Series): Series containing the grouped count of competitions.
        color_mapping (dict): Dictionary mapping the counts to specific colors.
    """
    legend_labels = []
    for count in grouped_counts.index:
        countries = country_counts[country_counts == count].index.tolist()
        for country in countries:
            legend_labels.append(f'{country} ({count})')

    country_color_mapping = {country: color_mapping[country_counts[country]] for country in country_counts.index}
    handles = [plt.Line2D([0], [0], marker='o', color='w', label=label, markersize=10,
                          markerfacecolor=country_color_mapping[label.split(' (')[0]]) for label in legend_labels]
    plt.legend(handles, legend_labels, title="Paesi", loc="center left", bbox_to_anchor=(1, 0, 0.5, 1))


def plot_country_distribution(grouped_counts, country_counts, color_mapping):
    """
    Create and display a pie chart with a legend for the distribution of competitions by country.

    Args:
        grouped_counts (pandas.Series): Series containing the grouped count of competitions.
        country_counts (pandas.Series): Series containing the count of competitions per country.
        color_mapping (dict): Dictionary mapping the counts to specific colors.
    """
    create_pie_chart(grouped_counts, color_mapping)
    create_legend(country_counts, grouped_counts, color_mapping)
    plt.show()


def load_europe_map():
    """
    Load the world map and filter to include only Europe.

    Returns:
        geopandas.GeoDataFrame: A GeoDataFrame containing the map of Europe.
    """
    world = gpd.read_file(gpd.datasets.get_path('naturalearth_lowres'))

    europe = world[world['continent'] == 'Europe']
    return europe


def plot_competition_distribution(europe, country_counts):
    """
    Merge the map of Europe with the counts of competitions by country and display the distribution.

    Args:
        europe (geopandas.GeoDataFrame): A GeoDataFrame containing the map of Europe.
        country_counts (pandas.Series): Series containing the count of competitions per country.
    """
    country_counts = country_counts.rename('competition_count')

    merged = europe.set_index('name').join(country_counts)

    fig, ax = plt.subplots(1, 1, figsize=(15, 10))
    merged.plot(column='competition_count', ax=ax, legend=True, cmap='OrRd', missing_kwds={"color": "lightgrey"})
    plt.title('Distribution of Competitions by Country in Europe')
    plt.show()
