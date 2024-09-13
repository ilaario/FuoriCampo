/**
 * @type {string}
 * Keeps track of the current letter for pagination by the initial letter.
 */
let currentLetter = '';

/**
 * @type {Array}
 * Holds the rows of teams to be displayed, grouped by their starting letter.
 */
let letterRows = {};

/**
 * @type {Array}
 * Holds the sorted list of letters for easy navigation between them.
 */
let sortedLetters = [];

let isSearching = false; // Flag to indicate if the user is searching


function mapSpecialChars(char) {
    const specialCharsMap = {
        'Ç': 'C',
        'Ü': 'U',
        'İ': 'I',
        // Add more mappings here if needed
    };

    return specialCharsMap[char] || char;
}

/**
 * Initializes the application.
 *
 * This function gets the search button and search bar elements from the DOM.
 * It then adds a click event listener to the search button.
 * When the search button is clicked, it gets the value from the search bar.
 * If the value is not null and not an empty string, it calls the `queryPlayers` function with the input value.
 */
function init(){
    loadPlayers();

    // Event listener for the previous button
    document.getElementById('prevButton').addEventListener('click', () => {
        const currentIndex = sortedLetters.indexOf(currentLetter);
        if (currentIndex > 0) {
            currentLetter = sortedLetters[currentIndex - 1];
            updateRows();
        }
    });

    // Event listener for the next button
    document.getElementById('nextButton').addEventListener('click', () => {
        const currentIndex = sortedLetters.indexOf(currentLetter);
        if (currentIndex < sortedLetters.length - 1) {
            currentLetter = sortedLetters[currentIndex + 1];
            updateRows();
        }
    });

    // Event listener for the search bar
    document.getElementById('searchBar').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        isSearching = searchQuery.length > 0;
        currentLetter = sortedLetters[0]; // Reset current letter to the first one
        updateRows();
    });
}

function loadPlayers() {
    axios.get('http://localhost:3000/players') // Replace with your route URL
        .then(response => {
            const players = response.data;

            // Reset letterRows and sortedLetters
            letterRows = {};
            sortedLetters = [];

            players.forEach(player => {
                const iniziale = mapSpecialChars(player["name"].charAt(0)); // Get the initial letter of the team name

                if (!letterRows[iniziale]) {
                    letterRows[iniziale] = []; // Initialize an array for this letter
                    sortedLetters.push(iniziale); // Add the letter to the list of sorted letters
                }

                const playerDiv = document.createElement('div');
                playerDiv.innerHTML = generatePlayerHTML(player); // Generate the team div

                letterRows[iniziale].push(playerDiv); // Add the team div to the letter row
            });

            sortedLetters.sort(); // Sort the letters alphabetically
            currentLetter = sortedLetters[0]; // Start with the first letter


            updateRows(); // Show the first set of teams
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateRows() {
    const playersContainer = document.querySelector('.playersContainer');
    playersContainer.innerHTML = ''; // Remove all existing rows before updating

    let rowsToShow;

    if (isSearching) {
        rowsToShow = filterRowsBySearch(); // Get filtered rows when searching
    } else {
        rowsToShow = letterRows[currentLetter] || []; // Get the rows for the current letter
    }

    // Append each team in the current letter's group
    rowsToShow.forEach(squad => {
        playersContainer.appendChild(squad);
    });

    // Update the UI with the current letter
    document.getElementById('currentLetterDisplay').textContent = currentLetter;
}

function filterRowsBySearch() {
    const filteredPlayers = [];

    // Loop through all teams and filter by search query
    Object.keys(letterRows).forEach(letter => {
        letterRows[letter].forEach(player => {
            if (player.querySelector('span').textContent.toLowerCase().includes(searchQuery)) {
                filteredPlayers.push(player);
            }
        });
    });

    return filteredPlayers;
}

function generatePlayerHTML(player) {
    return `
        <div class="player" onclick="window.open('player_page.html?player_name=${encodeURIComponent(player["name"])}&player_id=${player["id"]}', '_blank')">
            <img src="${player["imageUrl"]}" alt="player" class="playerImage">
            <div class="playerInfo">
                <p>${player["position"]}</p>
                <span>${player["name"]}</span>
            </div>
        </div>
    `;
}
