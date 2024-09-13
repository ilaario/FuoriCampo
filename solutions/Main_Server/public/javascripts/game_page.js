let homeClubId;
let awayClubId;

const CHAMPIONSHIPS = {
    "domestic_league": "Domestic League",
    "domestic_cup": "Domestic Cup",
    "international_cup": "International Cup",
    "other": "Other"
}

/**
 * Initializes the page by fetching game data based on the 'game_id' URL parameter.
 *
 * This function retrieves the 'game_id' parameter from the current URL, and then calls the `getGamesById` function with this ID.
 */
function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get('game_id');
    getGamesById(Id);
}

/**
 * Fetches game data by ID and updates the page with the fetched data.
 *
 * This function sends a GET request to the 'getGameById' endpoint with the provided ID as a parameter.
 * It then processes the response, updating various elements on the page with the fetched game data.
 * This includes the home and away club names, season, round, goals, date, stadium, competition type, referee, and managers.
 * It also sets up event listeners for the home and away team titles, toggling the display of the respective formation containers.
 * If there is an error with the request, it logs the error and hides the loading overlay.
 *
 * @param {string} Id - The ID of the game to fetch data for.
 */
function getGamesById(Id) {
    document.getElementById('loadingOverlay').style.display = 'block';
    console.log(Id);
    axios.get('http://localhost:3000/getGameById', { params: { game_id: Id } })
        .then(response => {
            console.log(response);
            const game = response.data;
            let date = new Date(game.date);
            let formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

            homeClubId = game.home_club_id;
            awayClubId = game.away_club_id;
            console.log(homeClubId);
            console.log(awayClubId);
            getLineUps(Id, homeClubId);
            getLineUps(Id, awayClubId);

            // Update page elements with game data
            document.getElementById('homeIcon').src = 'https://tmssl.akamaized.net/images/wappen/head/' + homeClubId + '.png';
            document.getElementById('homeClub').innerHTML = game.home_club_name;
            document.getElementById('season').innerHTML = game.season;
            document.getElementById('matchday').innerHTML = game.round;
            document.getElementById('resultHome').innerHTML = game.home_club_goals;
            document.getElementById('resultAway').innerHTML = game.away_club_goals;
            document.getElementById('date').innerHTML = formattedDate;
            document.getElementById('stadium').innerHTML = game.stadium;
            document.getElementById('awayIcon').src = 'https://tmssl.akamaized.net/images/wappen/head/' + awayClubId + '.png';
            document.getElementById('awayClub').innerHTML = game.away_club_name;
            document.getElementById('competitionType').innerHTML = CHAMPIONSHIPS[game.competition_type];
            document.getElementById('referee').innerHTML = game.referee;
            document.getElementById('homeManager').innerHTML = game.home_club_manager_name;
            document.getElementById('awayManager').innerHTML = game.away_club_manager_name;
            document.getElementById('homeNumericFormation').innerHTML = game.home_club_formation;
            document.getElementById('awayNumericFormation').innerHTML = game.away_club_formation;

            const formationTitle = document.getElementById('formationTitle');

            // Create and append home team title
            const homeTeamTitle = document.createElement('h2');
            homeTeamTitle.classList.add('singleTeamTitle');
            homeTeamTitle.textContent = game.home_club_name;
            homeTeamTitle.id = 'homeTeamTitle'; // Add id
            homeTeamTitle.style.color = '#14631CFF';
            homeTeamTitle.style.borderBottom = '2px solid #14631CFF';
            formationTitle.appendChild(homeTeamTitle);

            // Create and append away team title
            const awayTeamTitle = document.createElement('h2');
            awayTeamTitle.classList.add('singleTeamTitle');
            awayTeamTitle.textContent = game.away_club_name;
            awayTeamTitle.id = 'awayTeamTitle'; // Add id
            formationTitle.appendChild(awayTeamTitle);

            // Event listener for home team title
            homeTeamTitle.addEventListener('click', function() {
                this.style.color = '#020887';
                this.style.borderBottom = '2px solid #020887';
                awayTeamTitle.style.color = 'black';
                awayTeamTitle.style.borderBottom = 'none';
                document.getElementById('formationContainerHome').style.display = 'flex';
                document.getElementById('formationContainerAway').style.display = 'none';
            });

            // Event listener for away team title
            awayTeamTitle.addEventListener('click', function() {
                this.style.color = '#020887';
                this.style.borderBottom = '2px solid #020887';
                homeTeamTitle.style.color = 'black';
                homeTeamTitle.style.borderBottom = 'none';
                document.getElementById('formationContainerHome').style.display = 'none';
                document.getElementById('formationContainerAway').style.display = 'flex';
            });

            // Fetch game events
            getGameEventsByGameId(Id);

        })
        .catch(error => {
            console.error(error);
            document.getElementById('loadingOverlay').style.display = 'none';
        });
}

/**
 * Fetches game events by game ID and displays them on the page.
 *
 * This function sends a GET request to the 'getGameEventsByGameId' endpoint with the provided game ID as a parameter.
 * It then processes the response, passing the fetched game events data to the `displayGameEvents` function.
 * If there is an error with the request, it logs the error and hides the loading overlay.
 *
 * @param {string} Id - The ID of the game to fetch events for.
 */
function getGameEventsByGameId(Id) {
    console.log(Id);
    axios.get('http://localhost:3000/getGameEventsByGameId', { params: { game_id: Id } })
        .then(response => {
            console.log(response);
            displayGameEvents(response.data);
        })
        .catch(error => {
            console.error(error);
            document.getElementById('loadingOverlay').style.display = 'none';
            document.getElementById('timeline-container').style.display = 'none';
        });
}

/**
 * Fetches lineup data for a specific game and club, and updates the page with the fetched data.
 *
 * This function sends a GET request to the 'getLineUps' endpoint with the provided game ID and club ID as parameters.
 * It then processes the response, passing the fetched lineup data to the `generateFormation` and `displayLineUps` functions.
 * If there is an error with the request, it logs the error.
 *
 * @param {string} Id - The ID of the game to fetch lineup data for.
 * @param {string} clubId - The ID of the club to fetch lineup data for.
 */
function getLineUps(Id, clubId) {
    return axios.get('http://localhost:3000/getLineUps', { params: { game_id: Id, club_id: clubId } })
        .then(response => {
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                console.log(response);
                generateFormation(response.data, clubId);
            } else {
                throw new Error('No lineup data received or data is not in the expected format.');
            }
        })
        .catch(error => {
            document.getElementById('containerInfo').style.display = 'none';
            console.error('An error occurred while fetching lineups:', error);

        });
}

/**
 * Generates the formation of a team based on the provided lineup data and club ID.
 *
 * This function first checks if the lineup data is empty. If it is, it hides the 'containerInfo' element and returns.
 * It then determines whether the lineup data is for the home team or the away team based on the provided club ID.
 * It separates the lineup data into starting lineup and substitutes.
 * It then creates and appends the necessary HTML elements to the appropriate formation container ('homeFormation' or 'awayFormation') to display the starting lineup and substitutes.
 *
 * @param {Array} lineupData - The lineup data for a team.
 * @param {string} clubId - The ID of the club to generate the formation for.
 */
function generateFormation(lineupData, clubId) {

    if (!Array.isArray(lineupData) || lineupData.length === 0) {
        document.getElementById('containerInfo').style.display = 'none';
        return;
    }

    // Determines if the formation data is for the home team or the away team
    const isHomeTeam = clubId === homeClubId;

    const startingLineup = lineupData.filter(player => player.type === 'starting_lineup');
    const substitutes = lineupData.filter(player => player.type === 'substitutes');

    if(isHomeTeam) {
        const homeFormation = document.getElementById('homeFormation');

        // Create the starting div
        const starting = document.createElement('div');
        starting.classList.add('starting');

        // Create the h2 element for Titolari
        const titolariTitle = document.createElement('h2');
        titolariTitle.textContent = 'Starting Lineup';
        titolariTitle.className = 'titolariTitle';
        starting.appendChild(titolariTitle);

        // Iterate over each player in the starting lineup
        startingLineup.forEach(player => {
            starting.appendChild(createPlayerDivStart(player.number, player.player_name, player.position, player.team_captain, player.player_id));
        });

        homeFormation.appendChild(starting);

        const substitutesDiv = document.createElement('div');
        substitutesDiv.classList.add('substitutes');

        const substitutesTitle = document.createElement('h2');
        substitutesTitle.textContent = 'Substitutes';
        substitutesTitle.className = 'substitutesTitle';
        substitutesDiv.appendChild(substitutesTitle);

        substitutes.forEach(player => {
            substitutesDiv.appendChild(createPlayerDivSub(player.number, player.player_name, player.position, player.player_id));
        });

        homeFormation.appendChild(substitutesDiv);
    } else {
        const awayFormation = document.getElementById('awayFormation');

        // Create the starting div
        const starting = document.createElement('div');
        starting.classList.add('starting');

        // Create the h2 element for Titolari
        const titolariTitle = document.createElement('h2');
        titolariTitle.textContent = 'Starting Lineup';
        starting.appendChild(titolariTitle);

        // Iterate over each player in the starting lineup
        startingLineup.forEach(player => {
            starting.appendChild(createPlayerDivStart(player.number, player.player_name, player.position, player.team_captain, player.player_id));
        });

        awayFormation.appendChild(starting);

        const substitutesDiv = document.createElement('div');
        substitutesDiv.classList.add('substitutes');

        const substitutesTitle = document.createElement('h2');
        substitutesTitle.textContent = 'Substitutes';
        substitutesDiv.appendChild(substitutesTitle);

        substitutes.forEach(player => {
            substitutesDiv.appendChild(createPlayerDivSub(player.number, player.player_name, player.position, player.player_id));
        });

        awayFormation.appendChild(substitutesDiv);
    }
}
/**
 * Creates and returns a div element representing a starting player.
 *
 * This function creates a div element with the class 'startingListRow', and sets up an event listener for it that opens a new page with the player's ID in the URL when clicked.
 * It also creates and appends child div elements for the player's number, name, and role, and a span element for the captain indicator if the player is a captain.
 *
 * @param {number} number - The player's number.
 * @param {string} name - The player's name.
 * @param {string} role - The player's role.
 * @param {boolean} captain - Whether the player is a captain.
 * @param {string} playerId - The player's ID.
 * @returns {HTMLDivElement} The created player div element.
 */
function createPlayerDivStart(number, name, role, captain, playerId) {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('startingListRow');

    // Add an event listener to playerDiv
    playerDiv.addEventListener('click', function() {
        // Here you can do something with playerId when playerDiv is clicked
        window.open(`playerPage.html?player_id=${playerId}`, '_blank');
    });

    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.textContent = number;
    playerDiv.appendChild(numberDiv);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    const nameP = document.createElement('p');
    nameP.textContent = name;
    nameDiv.appendChild(nameP);

    if (captain) {
        const captainSpan = document.createElement('span');
        captainSpan.textContent = ' C';
        captainSpan.style.color = 'red';
        nameP.appendChild(captainSpan);
    }

    playerDiv.appendChild(nameDiv);

    const roleDiv = document.createElement('div');
    roleDiv.classList.add('role');
    roleDiv.textContent = role;
    playerDiv.appendChild(roleDiv);

    return playerDiv;
}

/**
 * Creates and returns a div element representing a substitute player.
 *
 * This function creates a div element with the class 'substituteListRow', and sets up an event listener for it that opens a new page with the player's ID in the URL when clicked.
 * It also creates and appends child div elements for the player's number, name, and role.
 *
 * @param {number} number - The player's number.
 * @param {string} name - The player's name.
 * @param {string} role - The player's role.
 * @param {string} playerId - The player's ID.
 * @returns {HTMLDivElement} The created player div element.
 */
function createPlayerDivSub(number, name, role, playerId) {
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('substituteListRow');

    playerDiv.addEventListener('click', function() {
        // Here we open a new window with the player's ID as a parameter in the URL
        window.open(`playerPage.html?player_id=${playerId}`, '_blank');
    });

    const numberDiv = document.createElement('div');
    numberDiv.classList.add('number');
    numberDiv.textContent = number;
    playerDiv.appendChild(numberDiv);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    const nameP = document.createElement('p');
    nameP.textContent = name;
    nameDiv.appendChild(nameP);
    playerDiv.appendChild(nameDiv);

    const roleDiv = document.createElement('div');
    roleDiv.classList.add('role');
    const roleP = document.createElement('p');
    roleP.textContent = role;
    roleDiv.appendChild(roleP);
    playerDiv.appendChild(roleDiv);

    return playerDiv;
}

/**
 * Displays game events on the page.
 *
 * This function iterates over the provided array of game events, creating and appending HTML elements to the '.timeline-container' element for each event.
 * It creates separate elements for home and away events, and uses the appropriate one based on the club ID of the event.
 * It then calls the appropriate function to generate the HTML for the event based on the event type ('Goals', 'Substitutions', or 'Cards'), and inserts this HTML into the event element.
 * Finally, it hides the loading overlay.
 *
 * @param {Array} events - The game events to display.
 */
function displayGameEvents(events) {
    const timelineContainer = document.querySelector('.timeline-container');
    document.getElementById('timeline-container').style.display = 'block';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('timeLineRow');

        const eventHomeElement = document.createElement('div');
        eventHomeElement.classList.add('timeLineHome');

        const eventAwayElement = document.createElement('div');
        eventAwayElement.classList.add('timelineAway');

        const eventType = event.type;
        const clubId = event.club_id;

        // Determines if the event is for the home team or the away team
        const isHomeEvent = clubId === homeClubId;
        const isAwayEvent = clubId === awayClubId;

        // Select the correct element based on whether the event is for the home team or the away team
        const eventElementToUse = isHomeEvent ? eventHomeElement : isAwayEvent ? eventAwayElement : null;

        if (eventElementToUse) {
            if (eventType === 'Goals') {
                eventElementToUse.innerHTML = createGoalEventElement(event, isHomeEvent);
            } else if (eventType === 'Substitutions') {
                eventElementToUse.innerHTML = createSubstitutionEventElement(event, isHomeEvent);
            } else if (eventType === 'Cards') {
                eventElementToUse.innerHTML = createCardEventElement(event, isHomeEvent);
            }
        }

        eventElement.appendChild(eventHomeElement);
        eventElement.appendChild(eventAwayElement);
        timelineContainer.appendChild(eventElement);
    });
    document.getElementById('loadingOverlay').style.display = 'none';
}


/**
 * Creates and returns a string of HTML representing a goal event.
 *
 * This function takes an event object and a boolean indicating whether the event is for the home team.
 * It extracts the player name, assist name, and minute from the event object, and determines the appropriate CSS classes based on whether the event is for the home team.
 * It then constructs a string of HTML representing the goal event, with the player name, assist name (if any), and minute inserted into the appropriate places.
 * The returned HTML string can be inserted into the DOM to display the goal event.
 *
 * @param {Object} event - The event object, containing information about the goal event.
 * @param {boolean} isHomeEvent - Whether the event is for the home team.
 * @returns {string} A string of HTML representing the goal event.
 */
function createGoalEventElement(event, isHomeEvent) {
    const playerName = event.nome_player_id["name"];
    const assistName = event.nome_player_assist_id["name"];
    const minute = event.minute;
    const dotClass = isHomeEvent ? 'dotHome' : 'dotAway';
    const sideClass = isHomeEvent ? 'home' : 'away';

    return `
        <div class="event">
            <span class="${dotClass}"></span>
            <div class="${sideClass}">
                <div class="timeIcon">
                    <div class="time">
                        <p>${minute}'</p>
                    </div>
                    <div class="icon">
                        <p><i class="fas fa-futbol"></i></p>
                    </div>
                </div>
                <div class="eventDescription">
                    <div class="containerEvent">
                        <div class="eventName">
                            <p>Goal</p>
                        </div>
                        <div class="players">
                            <div class="mainPlayer">
                                <p>${playerName}</p>
                            </div>
                            ${assistName ? `<div class="subPlayer"><p>assist: ${assistName}</p></div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Creates and returns a string of HTML representing a substitution event.
 *
 * This function takes an event object and a boolean indicating whether the event is for the home team.
 * It extracts the player name, the substituted player's name, and the minute from the event object, and determines the appropriate CSS classes based on whether the event is for the home team.
 * It then constructs a string of HTML representing the substitution event, with the player names and minute inserted into the appropriate places.
 * The returned HTML string can be inserted into the DOM to display the substitution event.
 *
 * @param {Object} event - The event object, containing information about the substitution event.
 * @param {boolean} isHomeEvent - Whether the event is for the home team.
 * @returns {string} A string of HTML representing the substitution event.
 */
function createSubstitutionEventElement(event, isHomeEvent) {
    const playerName = event.nome_player_id["name"];
    const inPlayerName = event.nome_player_in_id["name"];
    const minute = event.minute;
    const dotClass = isHomeEvent ? 'dotHome' : 'dotAway';
    const sideClass = isHomeEvent ? 'home' : 'away';

    return `
        <div class="event">
            <span class="${dotClass}"></span>
            <div class="${sideClass}">
                <div class="timeIcon">
                    <div class="time">
                        <p>${minute}'</p>
                    </div>
                    <div class="icon">
                        <p><i class="fas fa-handshake"></i></p>
                    </div>
                </div>
                <div class="eventDescription">
                    <div class="containerEvent">
                        <div class="eventName">
                            <p>Substitution</p>
                        </div>
                        <div class="players">
                            <div class="mainPlayer">
                                <p>IN: ${inPlayerName}</p>
                            </div>
                            <div class="subPlayer">
                                <p>OUT: ${playerName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Creates and returns a string of HTML representing a card event.
 *
 * This function takes an event object and a boolean indicating whether the event is for the home team.
 * It extracts the player name, description, and minute from the event object, and determines the appropriate CSS classes based on whether the event is for the home team.
 * It checks if the description includes 'yellow' to determine the type of card.
 * It then constructs a string of HTML representing the card event, with the player name, card type (yellow or red), and minute inserted into the appropriate places.
 * The returned HTML string can be inserted into the DOM to display the card event.
 *
 * @param {Object} event - The event object, containing information about the card event.
 * @param {boolean} isHomeEvent - Whether the event is for the home team.
 * @returns {string} A string of HTML representing the card event.
 */
function createCardEventElement(event, isHomeEvent) {
    const playerName = event.nome_player_id["name"];
    const description = event.description;
    const isYellow = description.toLowerCase().includes('yellow');
    const minute = event.minute;
    const dotClass = isHomeEvent ? 'dotHome' : 'dotAway';
    const sideClass = isHomeEvent ? 'home' : 'away';

    return `
        <div class="event">
            <span class="${dotClass}"></span>
            <div class="${sideClass}">
                <div class="timeIcon">
                    <div class="time">
                        <p>${minute}'</p>
                    </div>
                    <div class="icon">
                        <p><img src="images/cartellino${isYellow ? 'Giallo' : 'Rosso'}.png" alt="${isYellow ? 'Yellow' : 'Red'} Card Icon"></p>
                    </div>
                </div>
                <div class="eventDescription">
                    <div class="containerEvent">
                        <div class="eventName">
                            <p>${isYellow ? 'Yellow' : 'Red'} Card</p>
                        </div>
                        <div class="players">
                            <div class="mainPlayer">
                                <p>${playerName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}
