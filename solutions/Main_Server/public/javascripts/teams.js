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

/**
 * Initializes the application by loading teams and setting up event listeners for pagination and search functionality.
 * - Loads the list of teams.
 * - Sets up event listeners for previous and next buttons.
 * - Sets up event listener for the search bar to filter teams based on input.
 */
function init() {
    loadSquadre();

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

/**
 * Maps special characters to their corresponding standard characters.
 *
 * @param {string} char - The character to map.
 * @returns {string} The mapped character.
 */
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
 * Loads the list of teams from the server and groups them by the first letter of their names.
 */
function loadSquadre() {
    axios.get('http://localhost:3000/clubs') // Replace with your route URL
        .then(response => {
            const squadre = response.data;

            // Reset letterRows and sortedLetters
            letterRows = {};
            sortedLetters = [];

            squadre.forEach(squadra => {
                const iniziale = mapSpecialChars(squadra["name"].charAt(0)); // Get the initial letter of the team name

                if (!letterRows[iniziale]) {
                    letterRows[iniziale] = []; // Initialize an array for this letter
                    sortedLetters.push(iniziale); // Add the letter to the list of sorted letters
                }

                // Create a new div "squad" with the team name and add it to the array for this letter
                const squadDiv = document.createElement('div');
                squadDiv.dataset.id = squadra["id"];
                squadDiv.className = 'squad';
                squadDiv.dataset.team = squadra["name"]; // Add the data-team attribute
                squadDiv.setAttribute('onclick', 'openTeamPage(event)'); // Add the onclick attribute
                squadDiv.innerHTML = `
                    <img src="https://tmssl.akamaized.net/images/wappen/head/${squadra["id"]}.png" alt="${squadra["name"]}">
                    <span>${squadra["name"]}</span>
                `;

                letterRows[iniziale].push(squadDiv); // Add the team div to the letter row
            });

            sortedLetters.sort(); // Sort the letters alphabetically
            currentLetter = sortedLetters[0]; // Start with the first letter


            updateRows(); // Show the first set of teams
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * Updates the displayed rows of teams based on the current letter and search query.
 * - Clears the existing rows in the container.
 * - Determines the teams to show based on the current letter or search filter.
 * - Appends the appropriate rows to the container.
 */
function updateRows() {
    const squadContainer = document.querySelector('.squadContainer');
    squadContainer.innerHTML = ''; // Remove all existing rows before updating

    let rowsToShow;

    if (isSearching) {
        rowsToShow = filterRowsBySearch(); // Get filtered rows when searching
    } else {
        rowsToShow = letterRows[currentLetter] || []; // Get the rows for the current letter
    }

    // Append each team in the current letter's group
    rowsToShow.forEach(squad => {
        squadContainer.appendChild(squad);
    });

    // Update the UI with the current letter
    document.getElementById('currentLetterDisplay').textContent = currentLetter;
}

/**
 * Filters teams based on the current search query across all letters.
 * - Loops through all the letter groups and filters the teams within them.
 *
 * @returns {Array} The filtered teams.
 */
function filterRowsBySearch() {
    const filteredTeams = [];

    // Loop through all teams and filter by search query
    Object.keys(letterRows).forEach(letter => {
        letterRows[letter].forEach(squad => {
            if (squad.querySelector('span').textContent.toLowerCase().includes(searchQuery)) {
                filteredTeams.push(squad);
            }
        });
    });

    return filteredTeams;
}

/**
 * Opens the detailed page for a team when clicked.
 * - Retrieves the team name and ID from the clicked element.
 * - Opens a new page with the team's details.
 *
 * @param {Event} event - The click event.
 */
function openTeamPage(event) {
    if (event.target.tagName.toLowerCase() === 'img' || event.target.tagName.toLowerCase() === 'span' || event.target.className === 'squad') {
        const teamName = event.target.getAttribute('data-team') || event.target.parentNode.getAttribute('data-team');
        const teamId = event.target.getAttribute('data-id') || event.target.parentNode.getAttribute('data-id');
        window.open('team_page.html?team=' + encodeURIComponent(teamName) + '&id=' + encodeURIComponent(teamId), '_blank');
    }
}
