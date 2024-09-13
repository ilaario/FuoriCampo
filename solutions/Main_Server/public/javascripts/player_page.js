let isLoadingData = false;
let seasonsData = null;
let isStatisticsClicked = false;

/**
 * Initializes the page to display player information.
 * Sets up events for the "Statistics" and "Information" buttons.
 * Executes queries to fetch player data and their seasons.
 */
function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = Number(urlParams.get('player_id'));

    queryPlayerData(playerId);
    queryPlayerSeason(playerId);
}

/**
 * Executes a query to fetch player data using the specified player ID.
 * Displays the player's name and other personal information.
 *
 * @param {number} playerId - The player ID to query for.
 */
function queryPlayerData(playerId) {
    axios.get('http://localhost:3000/playerData', {params: {player_id: playerId}})
        .then(response => {
            console.log(response);
            document.getElementById('playerName').textContent = response.data["name"];
            document.getElementById('playerImage').src = response.data["imageUrl"];
            htmlPlayerInfo(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * Displays the player's personal information, including nationality, current club, and other details.
 *
 * @param {Object} player - Object containing the player's information.
 */
function htmlPlayerInfo(player) {
    showFlag(player["countryOfCitizenship"]);
    document.getElementById('State').textContent = player["countryOfCitizenship"];
    document.getElementById('teamImage').src = `https://tmssl.akamaized.net/images/wappen/head/${player["currentClubId"]}.png`;
    document.getElementById('teamName').textContent = player["currentClubName"];
    document.getElementById('subRole').textContent = player["subPosition"];
    document.getElementById('age').textContent = calculateAge(player["dateOfBirth"]);
    document.getElementById('height').textContent = player["heightInCm"] + ' cm';
    document.getElementById('foot').textContent = player["foot"];
    document.getElementById('currentValue').textContent = player["marketValueInEur"] / 1000000 + 'M €';
    document.getElementById('highestValue').textContent = player["highestMarketValueInEur"] / 1000000+ 'M €';
    document.getElementById('agentName').textContent = player["agentName"];
}

/**
 * Executes a query to fetch player seasons data using the specified player ID.
 * Stores the season data, creates a dropdown menu to select seasons, and displays data for the latest season.
 *
 * @param {number} playerId - The player ID to query for seasons.
 */
function queryPlayerSeason(playerId) {
    isLoadingData = true;
    axios.get('http://localhost:3000/playerSeason', { params: { player_id: playerId } })
        .then(response => {
            console.log(response);
            console.log(response.data);
            seasonsData = response.data;
            createSeasonSelect(seasonsData);
            let lastElement = seasonsData[seasonsData.length - 1];
            htmlPlayerSeason(lastElement);
            isLoadingData = false;
            if (!isLoadingData) {
                document.getElementById('loadingOverlay').style.display = 'none';
                if (isStatisticsClicked) {
                    document.getElementById('seasonSelect').style.display = 'block';
                    document.getElementById('playerSeason').style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error(error);
            isLoadingData = false;
            if (!isLoadingData) {
                document.getElementById('loadingOverlay').style.display = 'none';
            }
        });
}

/**
 * Displays statistical data for the selected season of the player.
 * Shows the number of assists, goals, minutes played, red cards, and yellow cards.
 *
 * @param {Object} player - Object containing statistical data for the player's season.
 */
function htmlPlayerSeason(player) {
    if (player) {
        document.getElementById('assist').textContent = player.totalAssists;
        document.getElementById('goal').textContent = player.totalGoals;
        document.getElementById('minutes').textContent = player.totalMinutesPlayed;
        document.getElementById('redCards').textContent = player.totalRedCards;
        document.getElementById('yellowCards').textContent = player.totalYellowCards;
    } else {
        document.getElementById('assist').textContent = 0;
        document.getElementById('goal').textContent = 0;
        document.getElementById('minutes').textContent = 0;
        document.getElementById('redCards').textContent = 0;
        document.getElementById('yellowCards').textContent = 0;
    }
}

/**
 * Calculates the player's age based on the provided date of birth.
 *
 * @param {string} dateOfBirth - The player's date of birth in 'YYYY-MM-DD' format.
 * @returns {number} - Calculated age of the player in years.
 */
function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 * Displays the national flag of the player's country.
 * Uses an external service to retrieve the flag image URL.
 *
 * @param {string} countryName - The player's country of citizenship.
 */
function showFlag(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
             // Use the flag URL directly from the API
            document.getElementById('flag').src = data[0].flags.png;

        })
        .catch(error => {
            console.error('Error fetching country information:', error);
            alert("Could not find the specified country.");
        });
}

/**
 * Shows the player's personal information section and hides the seasons section.
 */
function showInfo() {
    document.getElementById('playerInfo').style.display = 'block';
    document.getElementById('playerSeason').style.display = 'none';
    document.getElementById('seasonSelect').style.display = 'none';
}

/**
 * Shows the player's seasons section.
 * Manages the loading indicator and displays seasons based on the loading state.
 */
function showSeason() {
    document.getElementById('playerInfo').style.display = 'none';
    if (isLoadingData) {
        document.getElementById('loadingOverlay').style.display = 'flex';
    } else if (seasonsData) {
        document.getElementById('playerSeason').style.display = 'block';
        document.getElementById('seasonSelect').style.display = 'block';
    } else {
        queryPlayerSeason(playerId);
    }
}

/**
 * Creates a dropdown menu to select player seasons.
 * Adds options to the dropdown menu using the provided seasons data.
 *
 * @param {Array} seasons - Array of objects containing player seasons information.
 */
function createSeasonSelect(seasons) {
    let selectElement = document.getElementById('seasonSelect');
    seasons.forEach((season, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = season._id;
        selectElement.appendChild(option);
    });
    selectElement.options[selectElement.options.length - 1].selected = true;
    selectElement.addEventListener('change', function() {
        let selectedSeason = seasons[this.value];
        htmlPlayerSeason(selectedSeason);
    });
}
