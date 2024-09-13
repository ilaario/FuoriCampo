const COMPETITIONS = {
    "dfl-supercup": "DFL-Supercup",
    "uefa-champions-league-qualifikation": "UEFA Champions League Q.",
    "fa-cup": "FA Cup",
    "trophee-des-champions": "Trophée des Champions",
    "supertaca-candido-de-oliveira": "Supertaça Cândido de Oliveira",
    "italy-cup": "Coppa Italia",
    "supercopa": "Supercopa",
    "jupiler-pro-league": "Jupiler Pro League",
    "uefa-europa-conference-league-qualifikation": "UEFA Europa Conference League Q.",
    "belgian-supercup": "Belgian Supercup",
    "dfb-pokal": "DFB-Pokal",
    "sydbank-pokalen": "Sydbank Pokalen",
    "bundesliga": "Bundesliga",
    "superligaen": "Superligaen",
    "liga-portugal-bwin": "Liga Portugal Bwin",
    "copa-del-rey": "Copa del Rey",
    "super-league-1": "Super League 1",
    "eredivisie": "Eredivisie",
    "toto-knvb-beker": "TOTO KNVB Beker",
    "serie-a": "Serie A",
    "ukrainian-super-cup": "Ukrainian Super Cup",
    "russian-cup": "Russian Cup",
    "sfa-cup": "SFA Cup",
    "efl-cup": "EFL Cup",
    "fifa-klub-wm": "FIFA Klub-WM",
    "premier-league": "Premier League",
    "super-lig": "Süper Lig",
    "scottish-premiership": "Scottish Premiership",
    "uefa-super-cup": "UEFA Super Cup",
    "premier-liga": "Premier Liga",
    "community-shield": "Community Shield",
    "uefa-champions-league": "UEFA Champions League",
    "johan-cruijff-schaal": "Johan Cruijff Schaal",
    "europa-league": "UEFA Europa League",
    "allianz-cup": "Allianz Cup",
    "russian-super-cup": "Russian Super Cup",
    "ukrainian-cup": "Ukrainian Cup",
    "laliga": "LaLiga",
    "supercoppa-italiana": "Supercoppa Italiana",
    "ligue-1": "Ligue 1",
    "kypello-elladas": "Kypello Elladas",
    "europa-league-qualifikation": "UEFA Europa League Q.",
};

const socket= io();
let nome='';
let currentRoom='General';
let isLoggedIn = false;

/**
 * Initializes the application by setting up event listeners and default state.
 * This function performs the following tasks:
 * - Loads team data.
 * - Opens the navigation menu.
 * - Sets up event listeners for various elements.
 * - Hides certain containers by default.
 * - Handles user interactions such as joining a room or sending a message.
 * - Sets up socket event listeners for real-time communication.
 */
function init(){
    // Load initial team data and set up navigation
    loadCampionati();
    openNav();

    // Configure event listeners for navigation and user actions
    document.getElementById('openSideMenu').addEventListener('click', openNav);
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    document.getElementById('leave').addEventListener('click', () => leaveRoom(false));
    document.getElementById('join').addEventListener('click', joinGenerale);

    // Hide certain UI elements by default
    document.getElementById('chatContainer').style.display = 'none';
    document.getElementById('sendMessageContainer').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';

    // Set up event listeners for text input interactions
    document.getElementById('nome').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            joinGenerale();
        }
    });

    document.getElementById('messageText').addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendMessage();
        }
    });

    // Event listener for filtering teams based on search input
    document.getElementById('searchSquadre').addEventListener('keyup', filterCampionati);

    // Handle socket events for real-time communication
    socket.on('chat message', (msg,name) => displayMessage(msg, name));
    socket.on('user id', (userId) => {
        nome = userId;
    });
}
/**
 * Joins the general chat room. This function performs the following tasks:
 * - Checks if the user is logged in. If not, it either generates a user ID or uses the provided username.
 * - Hides the username input and join button after logging in.
 * - Displays the chat and message sending containers.
 * - Emits an event to the server to create or join a conversation in the current room.
 * - Updates the welcome message to show the current room.
 */
function joinGenerale(){
    let nomeInput = document.getElementById('nome');
    if (!isLoggedIn) {
        if (nomeInput.value === '') {
            // If the username input is empty, request the server to generate a user ID
            socket.emit('generate id');
        } else {
            // Otherwise, use the username entered by the user
            nome = nomeInput.value;
        }
        // Hide the username input and join button
        document.getElementById('nome').style.display = 'none';
        document.getElementById('join').style.display = 'none';
        isLoggedIn = true;
    }
    // Display the chat and message sending containers
    document.getElementById('chatContainer').style.display = 'block';
    document.getElementById('sendMessageContainer').style.display = 'block';
    // Emit an event to the server to create or join a conversation in the current room
    socket.emit('create or join conversation', currentRoom, nome);
    // Update and display the welcome message to show the current room
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('welcome').textContent = "Room: " + currentRoom;
}
/**
 * Sends a chat message to the current room.
 * - Retrieves the message from the input field.
 * - Checks if the message is not empty.
 * - If the user is logged in (token is present in sessionStorage), prefixes the message with "ESPERTO".
 * - Emits the message to the server along with the current room and username.
 * - Clears the message input field after sending.
 * - Alerts the user if they attempt to send an empty message.
 */
function sendMessage() {
    let messageInput = document.getElementById('messageText');
    let message = messageInput.value;
    if (message) {
        // Check if the user is logged in
        if (sessionStorage.getItem('token')) {
            // If the user is logged in, prefix the message with "ESPERTO"
            message = "(Esperto): " + message;
        }
        // Emit the message to the server with the current room and username
        socket.emit('chat message', currentRoom, message, nome);
        // Clear the message input field after sending
        messageInput.value = '';
    } else {
        // Alert the user if they attempt to send an empty message
        alert("Impossibile inviare un messaggio vuoto");
    }
}
/**
 * Handles the user leaving the current chat room.
 * - Saves the current room before changing it.
 * - Changes the current room to the new room if provided, otherwise defaults to "Generale".
 * - Sends a disconnection message if the user is not switching rooms.
 * - Clears the chat if switching rooms.
 * - Reloads the page if the user is completely logging out.
 *
 * @param {boolean} isSwitchingRooms - Indicates if the user is switching rooms.
 * @param {string} [newRoom] - The new room to switch to.
 */

function leaveRoom(isSwitchingRooms, newRoom) {
    // Save the current room before changing it
    let oldRoom = currentRoom;

    if (newRoom) {
        // Change the current room to the new room
        currentRoom = newRoom;
    } else {
        currentRoom = 'General';
    }

    // Send a disconnection message only if the user is not switching rooms
    if (isLoggedIn && !isSwitchingRooms) {
        socket.emit('chat message', oldRoom, nome + " has left the conversation", nome);
    }

    // Clear the chat only if switching rooms
    if (newRoom !== oldRoom) {
        document.getElementById('messageList').innerHTML = '';
    }

    isLoggedIn = false;

    // Reload the page if the user is completely logging out
    if (!isLoggedIn && !isSwitchingRooms) {
        location.reload();
    }
}
/**
 * Displays a chat message in the chat interface.
 * - Creates a new list item for the message.
 * - Appends the username and message content to the list item.
 * - Adds special styling for leave messages and expert messages.
 * - Appends the list item to the message list and scrolls to the bottom.
 *
 * @param {string} msg - The chat message content.
 * @param {string} name - The username of the message sender.
 */
function displayMessage(msg, name) {
    let messageList = document.getElementById('messageList');
    let newMessage = document.createElement('li');
    let strongName = document.createElement('strong');

    strongName.textContent = name;
    newMessage.appendChild(strongName);
    newMessage.appendChild(document.createTextNode(": " + msg));

    // Add special styling for leave messages
    if (msg.includes('has left the conversation')) {
        newMessage.classList.add('leave-message');
    }

    // Check if the message was sent by an expert
    if (msg.startsWith('(Esperto):')) {
        // If the message was sent by an expert, apply special styling
        newMessage.classList.add('expert-message');
    }

    messageList.appendChild(newMessage);
    messageList.scrollTop = messageList.scrollHeight; // Scroll to the bottom of the message list
}

/**
 * Generates a unique username based on a counter stored in localStorage.
 * - Increments the counter and saves it back to localStorage.
 * - Returns the generated username.
 *
 * @returns {string} The generated unique username.
 */
function generateUniqueName() {
    // Retrieve the current counter value from localStorage, default to 0 if not present
    let userCounter = parseInt(localStorage.getItem('userCounter')) || 0;

    // Increment the counter
    userCounter++;

    // Save the updated counter value back to localStorage
    localStorage.setItem('userCounter', userCounter);

    // Return the generated unique username
    return "utente" + userCounter;
}

/**
 * Opens the side navigation menu by setting its width to 350px.
 */
function openNav() {
    document.getElementById("sideMenu").style.width = "350px";
}

/**
 * Closes the side navigation menu by setting its width to 0 and resets the main content margin.
 * - Clears the search input and filters the team list after a delay.
 */
function closeNav() {
    document.getElementById("sideMenu").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    setTimeout(function() {
        document.getElementById("searchSquadre").value = "";
        filterSquadre();
    }, 500); // Ritardo di 500 millisecondi
}


/**
 * Filters the team list in the side menu based on the search query.
 * - Retrieves the search query and converts it to lowercase.
 * - Iterates over each team and checks if its name includes the search query.
 * - Shows or hides the team based on the search query match.
 */
function filterCampionati() {
    // Retrieve the search query and convert it to lowercase
    let searchQuery = document.getElementById('searchSquadre').value.toLowerCase();

    // Get all team elements in the side menu
    let squadre = document.querySelectorAll('#sideMenu .squadra');

    // Iterate over each team and check if its name includes the search query
    squadre.forEach(function(squadra) {
        let squadraNome = squadra.querySelector('.squadra-nome').textContent.toLowerCase();

        // Show or hide the team based on the search query match
        if (squadraNome.includes(searchQuery)) {
            squadra.style.display = 'flex';
        } else {
            squadra.style.display = 'none';
        }
    });
}

/**
 * Loads the list of teams from the server and populates the side menu with team elements.
 * - Fetches team data from the server.
 * - Creates and appends HTML elements for each team in the side menu.
 * - Sets up click event listeners for each team element to handle room switching.
 */

function loadCampionati() {
    axios.get('http://localhost:3000/allCompetitions')
        .then(response => {
            let campionati = response.data;

            // Get the side menu element
            let sideMenu = document.getElementById('sideMenu');

            // For each team, create an HTML element and add it to the side menu
            for (let campionato of campionati) {
                // Create a div for the team
                let campionatoDiv = document.createElement('div');
                campionatoDiv.className = 'squadra';

                // Create an image for the team
                let campionatoImg = document.createElement('img');
                let competitionIdLower = campionato[0].toLowerCase();
                campionatoImg.src = "https://tmssl.akamaized.net/images/logo/header/" + competitionIdLower + ".png";
                campionatoImg.alt = campionato[0];
                campionatoImg.className = 'squadra-img';

                // Create a p element for the team name
                let campionatoNome = document.createElement('p');
                campionatoNome.textContent = COMPETITIONS[campionato[1]];
                campionatoNome.className = 'squadra-nome';

                // Append the image and name to the team div
                campionatoDiv.appendChild(campionatoImg);
                campionatoDiv.appendChild(campionatoNome);

                // Add a click event listener to the team div
                campionatoDiv.addEventListener('click', function() {
                    if (isLoggedIn) { // Check if the user is logged into a chat
                        // Disconnect the user from the current chat and change the current room to the team's name
                        leaveRoom(true, COMPETITIONS[campionato[1]]);

                        // Join the user to the team's chat
                        joinGenerale();
                    } else {
                        // Change the current room to the team's name
                        currentRoom = COMPETITIONS[campionato[1]];

                        // Update the text of the "Join General Chat" button
                        document.getElementById('join').textContent = 'Enter the Team Chat of: ' + COMPETITIONS[campionato[1]];
                    }
                });

                // Append the team div to the side menu
                sideMenu.appendChild(campionatoDiv);
            }
        })
        .catch(error => console.error('Error:', error));
}
