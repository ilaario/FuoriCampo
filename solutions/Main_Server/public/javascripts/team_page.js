/**
 * Initializes the team page by setting up event listeners and loading team data.
 * - Retrieves the team name and ID from the URL parameters.
 * - Updates the UI with the team name and image.
 * - Sets up event listeners for showing team information and players.
 * - Fetches and displays team data and players.
 */
function init(){

    const urlParams = new URLSearchParams(window.location.search);
    const teamName = urlParams.get('team');
    const teamId = urlParams.get('id');

    document.getElementById('teamName').textContent = decodeURIComponent(teamName);
    document.getElementById('teamImage').src = 'https://tmssl.akamaized.net/images/wappen/head/' + teamId + '.png';

    queryTeamData(teamId);
    queryTeamPlayers2023(teamId);
}

/**
 * Fetches and displays detailed information about the team.
 * - Sends a GET request to retrieve team data.
 * - Iterates through the retrieved data and updates the UI with team information.
 *
 * @param {string} teamId - The ID of the team to fetch data for.
 */
function queryTeamData(teamId) {
    axios.get('http://localhost:3000/teamData', {params: {club_id: teamId}})
        .then(response => {
            console.log(response);

            // Get the container where you want to insert the information
            const infoContainer = document.querySelector('.infoCellsContainer');

            // Create an array with the information to display
            const infoArray = [
                { title: 'Stadium', value: response.data["stadiumName"] },
                { title: 'Stadium Seats', value: response.data["stadiumSeats"] },
                { title: 'National Players', value: response.data["nationalTeamPlayers"] },
                { title: 'Foreigners Players', value: response.data["foreignersNumber"] },
                { title: 'Average Age', value: response.data["averageAge"] },
                { title: 'Last Season', value: response.data["lastSeason"] }
            ];

            // Iterate through the array of information
            infoArray.forEach(info => {
                // Create a new div with the class 'info'
                const infoDiv = document.createElement('div');
                infoDiv.className = 'info';

                // Create a new h1 element and add the title
                const h1 = document.createElement('h1');
                h1.textContent = info.title;

                // Create a new h3 element and add the value
                const h3 = document.createElement('h3');
                h3.textContent = info.value;

                // Add the h1 and h3 elements to the 'info' div
                infoDiv.appendChild(h1);
                infoDiv.appendChild(h3);

                // Add the 'info' div to the information container
                infoContainer.appendChild(infoDiv);
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * Fetches and displays the team's players for the 2023 season.
 * - Sends a GET request to retrieve player data.
 * - Filters players by their positions (goalkeepers, defenders, midfielders, strikers).
 * - Updates the UI with the list of players categorized by their positions.
 *
 * @param {string} teamId - The ID of the team to fetch players for.
 */
function queryTeamPlayers2023(teamId) {
    axios.get('http://localhost:3000/teamPlayers', {params: {current_club_id: teamId}})
        .then(response => {
            console.log(response);

            const goalkeepers = response.data.filter(player => player["position"] === 'Goalkeeper');
            const defenders = response.data.filter(player => player["position"] === 'Defender');
            const midfielders = response.data.filter(player => player["position"] === 'Midfield');
            const strikers = response.data.filter(player => player["position"] === 'Attack');
            const playersContainer = document.getElementById('teamPlayers');
            playersContainer.innerHTML = `
        <div class="playersInPosition" id="goalKeeper">
               <div class="roleName">GOALKEEPERS</div>
                  <div class="playersContainer">
                    ${goalkeepers.map(player => generatePlayerHTML(player)).join('')}
                  </div>
        </div>
        <div class="playersInPosition" id="goalKeeper">
               <div class="roleName">DEFENDERS</div>
                  <div class="playersContainer">
                    ${defenders.map(player => generatePlayerHTML(player)).join('')}
                  </div>
        </div>
        <div class="playersInPosition" id="goalKeeper">
               <div class="roleName">MIDFIELDERS</div>
                  <div class="playersContainer">
                    ${midfielders.map(player => generatePlayerHTML(player)).join('')}
                  </div>
        </div>
        <div class="playersInPosition" id="goalKeeper">
               <div class="roleName">STRIKERS</div>
                  <div class="playersContainer">
                    ${strikers.map(player => generatePlayerHTML(player)).join('')}
                  </div>
        </div>
`;

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * Generates the HTML structure for a player's information.
 * - Creates a div element with player details and a click event to open the player's page.
 *
 * @param {Array} player - The player data array.
 * @param {string} player[0] - The player ID.
 * @param {string} player[1] - The player name.
 * @param {string} player[2] - The player position.
 * @param {string} player[3] - The player image URL.
 * @returns {string} The HTML string representing the player.
 */
function generatePlayerHTML(player) {
    return `
        <div class="player" onclick="window.open('player_page.html?player_name=${encodeURIComponent(player[1])}&player_id=${player[0]}', '_blank')">
            <img src="${player["imageUrl"]}" alt="player" class="playerImage">
            <div class="playerInfo">
                <p>${player["position"]}</p>
                <h4>${player["name"]}</h4>
            </div>
        </div>
    `;
}
