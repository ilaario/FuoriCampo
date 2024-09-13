/**
 * Initializes the application by loading the top players and recent matches.
 * - Fetches the top players from the server and updates the UI.
 * - Fetches the latest match data and updates the UI.
 */
function init(){
    fetchFootballNews().then(() => {
        console.log('News loaded successfully');
    });
    queryHighestValuePlayers();
    queryPartiteData();
    queryBestTeams();
}

/**
 * Fetches match data from the server and updates the UI.
 * - Sends a GET request to retrieve match data.
 * - Clears existing match data in the container.
 * - Generates HTML for each match and appends it to the container.
 */
function queryPartiteData() {
    axios.get('http://localhost:3000/gamesITByDate')
        .then(response => {
            console.log(response);

            const lastGamesContainer = document.querySelector('.lastGamesContainer');
            lastGamesContainer.innerHTML = ''; // Clear existing content

            response.data.forEach(game => {
                const gameHTML = generateGameHTML(game);
                lastGamesContainer.appendChild(gameHTML);
            });
        })
        .catch(error => {
            console.error('Errore:', error);
            const lastGamesContainer = document.querySelector('.lastGamesContainer');
            lastGamesContainer.innerHTML = '<p>Impossibile caricare le partite in questo momento. Riprova più tardi.</p>';
            lastGamesContainer.style.textAlign = 'center';
        });
}

/**
 * Generates the HTML structure for a game.
 * - Creates and populates the main game div with team and result information.
 * - Sets up the home team, away team, and result containers.
 *
 * @param {Object} game - The game data object.
 * @param {string} game.home_club_id - The home club ID.
 * @param {string} game.home_club_name - The home club name.
 * @param {number} game.home_club_goals - The home club goals.
 * @param {string} game.away_club_id - The away club ID.
 * @param {string} game.away_club_name - The away club name.
 * @param {number} game.away_club_goals - The away club goals.
 * @param {string} game.date - The date of the game.
 * @returns {HTMLElement} The HTML element representing the game.
 */
function generateGameHTML(game) {
    // Create main div
    const gameDiv = document.createElement('div');
    gameDiv.className = 'lastGame';
    gameDiv.id = `lastGame${game.home_club_id}`;

    gameDiv.addEventListener('click', function() {
        window.open(`game_page.html?game_id=${game.game_id}`, '_blank');
    });
    // Create home team container
    const homeTeamContainer = document.createElement('div');
    homeTeamContainer.className = 'homeTeamContainer';

    const homeImg = document.createElement('img');
    homeImg.src = `https://tmssl.akamaized.net/images/wappen/head/${game.home_club_id}.png`;
    homeImg.alt = game.home_club_name;
    homeImg.className = 'teamShieldImg';
    /**
    homeImg.addEventListener('click', function() {
        window.open('teamPage.html?team=' + encodeURIComponent(game.home_club_name) + '&id=' + encodeURIComponent(game.home_club_id), '_blank');
    });
    */
    const homeP = document.createElement('p');
    homeP.textContent = game.home_club_name;

    homeTeamContainer.appendChild(homeImg);
    homeTeamContainer.appendChild(homeP);

    // Create result container
    const resultContainer = document.createElement('div');
    resultContainer.className = 'resultContainer';

    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.textContent = new Date(game.date).toLocaleDateString();

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';

    const resultP1 = document.createElement('p');
    resultP1.textContent = game.home_club_goals;

    const resultH3 = document.createElement('h3');
    resultH3.className = 'result';
    resultH3.textContent = '-';

    const resultP2 = document.createElement('p');
    resultP2.textContent = game.away_club_goals;

    resultDiv.appendChild(resultP1);
    resultDiv.appendChild(resultH3);
    resultDiv.appendChild(resultP2);

    resultContainer.appendChild(dateDiv);
    resultContainer.appendChild(resultDiv);

    // Create away team container
    const awayTeamContainer = document.createElement('div');
    awayTeamContainer.className = 'awayTeamContainer';

    const awayP = document.createElement('p');
    awayP.textContent = game.away_club_name;

    const awayImg = document.createElement('img');
    awayImg.src = `https://tmssl.akamaized.net/images/wappen/head/${game.away_club_id}.png`;
    awayImg.alt = game.away_club_name;
    awayImg.className = 'teamShieldImg';

    awayTeamContainer.appendChild(awayP);
    awayTeamContainer.appendChild(awayImg);

    // Append all containers to main div
    gameDiv.appendChild(homeTeamContainer);
    gameDiv.appendChild(resultContainer);
    gameDiv.appendChild(awayTeamContainer);

    return gameDiv;
}

/**
 * Fetches the highest value players from the server and updates the UI.
 * - Sends a GET request to retrieve the highest value players data.
 * - Clears existing player data in the container.
 * - Generates HTML for each player and appends it to the container.
 * - The player data includes the player's image, name, and value.
 * - The player's name and value are also set as the title of the image element for tooltip display.
 * - The players are displayed in two rows, with the first 5 players in the first row and the next 5 players in the second row.
 *
 * @throws {Error} If there is an error in fetching the data, it is logged in the console.
 */
function queryHighestValuePlayers() {
    axios.get('http://localhost:3000/highestValuePlayers')
        .then(response => {

            const playersContainer = document.querySelector('.playersContainer');

            for (let i = 0; i <= 7; i++) {
                console.log('Player ' + i + ': ');
                console.log(response.data[i]);
                const higherPlayerDiv = document.createElement('div');
                higherPlayerDiv.className = 'player-item';

                const ranking = document.createElement('div');
                ranking.className = 'ranking';
                ranking.textContent = i + 1;
                higherPlayerDiv.appendChild(ranking);

                higherPlayerDiv.addEventListener('click', function () {
                    const playerName = encodeURIComponent(response.data[i]["name"]);
                    console.log('Player name ' + i + ': ' + playerName);
                    const playerId = response.data[i]["id"];
                    window.open(`player_page.html?player_name=${playerName}&player_id=${playerId}`, '_blank');
                });

                const imgDiv = document.createElement('div');
                imgDiv.className = 'player-photo';
                const imgElement = document.createElement('img');
                imgElement.src = response.data[i]["imageUrl"];
                imgElement.alt = response.data[i][1];

                imgDiv.appendChild(imgElement);
                higherPlayerDiv.appendChild(imgDiv);

                const higherPlayerName = document.createElement('div');
                const name = response.data[i]["name"];
                higherPlayerName.innerHTML = `<div class="player-name">${name}</div>`;
                higherPlayerDiv.appendChild(higherPlayerName);

                const higherPlayerValue = document.createElement('div');
                const valueInMillions = response.data[i]["highestMarketValueInEur"] / 1000000;
                higherPlayerValue.innerHTML = `<div class="player-info">$${valueInMillions}M</div>`;
                higherPlayerDiv.appendChild(higherPlayerValue);

                playersContainer.appendChild(higherPlayerDiv);
            }
        })
        .catch(error => {
            console.error('Errore nel recuperare i giocatori:', error);
            const playersContainer = document.querySelector('.playersContainer');
            //playersContainer.innerHTML = '<p>Impossibile caricare i giocatori in questo momento. Riprova più tardi.</p>';
            //playersContainer.style.textAlign = 'center';

            for (let i = 1; i <= 10; i++) {
                const playerItem = document.createElement('div');
                playerItem.innerHTML =
                    `<div class="player-item">
                        <div class="ranking">${i}</div>
                        <div class="player-photo">
                            <img src="https://via.placeholder.com/100" alt="Player Photo">
                        </div>
                        <div class="player-name">John Doe</div>
                        <div class="player-info">$1000000</div>
                    </div>`;
                playerItem.addEventListener('click', function () {
                    window.open(`player_page.html?player_name=0&player_id=0`, '_blank');
                });
                playersContainer.appendChild(playerItem);
            }
        });
    }

/**
 * Fetches the best teams from the server and updates the UI.
 * - Sends a GET request to retrieve the best teams data.
 * - Clears existing team data in the container.
 * - Generates an image for each team and appends it to the container.
 * - The team data includes the team's name and ID.
 * - The team's name and ID are used to generate the image source URL and the click event listener.
 * - The click event listener opens a new window with the team's page.
 *
 * @throws {Error} If there is an error in fetching the data, it is logged in the console.
 */
function queryBestTeams(){
    axios.get('http://localhost:3000/bestTeams')
        .then(response => {
            console.log(response.data);

            const topteamsContainer = document.querySelector('.topteamsContainer');

            let rankVal = 1
            response.data.forEach(squadra => {
                if (rankVal > 8) {
                    return;
                }
                console.log('Squadra: ');
                console.log(squadra);
                const teamItem = document.createElement('div');
                teamItem.classList.add('team-item');

                teamItem.addEventListener('click', function() {
                    window.open('team_page.html?team=' + encodeURIComponent(squadra["clubName"]) + '&id=' + encodeURIComponent(squadra["clubId"]), '_blank');
                });

                const ranking = document.createElement('div');
                ranking.className = 'ranking';
                ranking.textContent = rankVal;
                teamItem.appendChild(ranking);
                const imgDiv = document.createElement('div');
                imgDiv.className = 'team-img';
                const imgElement = document.createElement('img');
                imgElement.src = `https://tmssl.akamaized.net/images/wappen/head/${squadra["clubId"]}.png`;
                imgElement.alt = squadra["clubName"];

                imgDiv.appendChild(imgElement);
                teamItem.appendChild(imgDiv);

                const nameDiv = document.createElement('div');
                nameDiv.className = 'team-name';
                nameDiv.textContent = squadra["clubName"];
                teamItem.appendChild(nameDiv);

                const infoDiv = document.createElement('div');
                const valueInMillions = squadra["totalHighestMarketValue"] / 1000000;
                infoDiv.innerHTML = `<div class="team-info">$${valueInMillions}M</div>`;
                teamItem.appendChild(infoDiv);

                topteamsContainer.appendChild(teamItem);
                rankVal = rankVal + 1;
            });
        })
        .catch(error => {
            console.error('Errore:', error);
            const topteamsContainer = document.querySelector('.topteamsContainer');
            //topteamsContainer.innerHTML = '<p>Impossibile caricare le squadre in questo momento. Riprova più tardi.</p>';
            //topteamsContainer.style.textAlign = 'center';
            for (let i = 1; i <= 8; i++) {
                const teamItem = document.createElement('div');
                teamItem.classList.add('team-item');
                teamItem.innerHTML =
                    `<div class="ranking">${i}</div>
                    <div class="team-img">
                        <img src="https://via.placeholder.com/100" alt="Player Photo">
                    </div>
                    <div class="team-name">Team ${i}</div>
                    <div class="team-info">$1000000</div>`;
                teamItem.addEventListener('click', function() {
                    window.open('team_page.html?team=' + 0 + '&id=' + 0, '_blank');
                });
                topteamsContainer.appendChild(teamItem);
            }
        });
}

// Funzione per recuperare e visualizzare le notizie sul calcio utilizzando SerpApi
async function fetchFootballNews() {
    axios.get('http://localhost:3000/api/football-news')
        .then(response => {
            try {
                console.log(response.data);

                const newsSection = document.querySelector('.news-section');

                response.data.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');

                    newsItem.innerHTML = `
                    <h3 onclick="window.open('${article.link}', '_blank')">${article.title}</h3>
                `;

                    newsSection.appendChild(newsItem);
                });
            } catch (error) {
                console.error('Errore nel recuperare le notizie:', error);
                const newsSection = document.querySelector('.news-section');
                newsSection.innerHTML = '<p>Impossibile caricare le notizie in questo momento. Riprova più tardi.</p>';
            }
        });
}

