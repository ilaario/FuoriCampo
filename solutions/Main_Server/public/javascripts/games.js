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

const CHAMPIONSHIPS = {
    "domestic_league": "Domestic Leagues",
    "domestic_cup": "Domestic Cups",
    "international_cup": "International Cups",
    "other": "Others"
}

/**
 * Initializes the application.
 *
 * This function is responsible for setting up the initial state of the application.
 * It calls functions to populate the season and championship dropdowns, and sets up the event listener for the 'queryJoin' button.
 * When the 'queryJoin' button is clicked, it retrieves the selected values from the 'Stagione', 'Campionato', 'Competizione', and 'data' fields, and calls the 'queryPartite' function with these values.
 */
function init(){
    DropDownStagione();
    dataStagione();
    DropDownCampionato();
    stagioneData();
    document.getElementById('queryJoin').onclick = function() {
        const stagione = document.getElementById('Stagione').value;
        const campionato = document.getElementById('Campionato').value;
        const competizione = document.getElementById('Competizione').value;
        const data = document.getElementById('data').value;
        queryPartite(stagione, campionato, competizione, data);
    };
}

/**
 * Makes an HTTP GET request to the 'queryPartite' endpoint with the provided parameters.
 *
 * This function logs the provided parameters to the console, constructs an object with these parameters, and makes a GET request to the 'queryPartite' endpoint with this object.
 * If the request is successful, it logs the response data to the console and calls the 'OutputOnHTML' function with the response as an argument.
 * If an error occurs during the request, it is logged to the console.
 *
 * @param {string} stagione - The season to query.
 * @param {string} campionato - The championship to query.
 * @param {string} competizione - The competition to query.
 * @param {string} data - The date to query.
 */
function queryPartite(stagione, campionato, competizione, data){
    console.log(stagione, campionato, competizione, data);

    const outputDiv = document.getElementById('result');
    const outputDivError = document.getElementById('result');
    outputDiv.innerHTML = '';

    const params = {
        season: stagione,
        competition_type: campionato,
        competition_id: competizione,
        date: data
    }

    axios.get('http://localhost:3000/queryPartite', { params })
        .then(response => {
            const data = response.data;
            if (data.error) {
                outputDivError.style.color = 'black';
                outputDivError.style.fontSize = '40px';
                outputDivError.style.fontWeight = 'bold';
                outputDivError.style.display = 'flex';
                outputDivError.style.justifyContent = 'center';
                outputDivError.style.alignItems = 'center';
                outputDivError.style.width = '100%';
                outputDivError.textContent = 'La ricerca non ha generato risultati!';
                throw new Error(data.error);
            }
            OutputOnHTML(response);
            console.log(data);
        })
        .catch(error => {
            console.error('Errore:', error);
            outputDivError.style.color = 'black';
            outputDivError.style.fontSize = '40px';
            outputDivError.style.fontWeight = 'bold';
            outputDivError.style.display = 'flex';
            outputDivError.style.justifyContent = 'center';
            outputDivError.style.alignItems = 'center';
            outputDivError.style.width = '100%';
            outputDivError.textContent = 'La ricerca non ha generato risultati!';
        });
}

/**
 * Sets up event listeners for changes in the 'Stagione' and 'Campionato' dropdowns.
 *
 * This function adds an event listener to the 'Stagione' dropdown that updates the min and max attributes of the 'data' input field based on the selected year.
 * It also adds an event listener to the 'Campionato' dropdown that makes a GET request to the 'Competizioni' endpoint with the selected option as a parameter if the selected option is not 'Tutti i Campionati'.
 * The response from the 'Competizioni' endpoint is used to populate the 'Competizione' dropdown with options.
 *
 * @callback selectStagioneChangeCallback
 * @callback selectCampionatoChangeCallback
 * @callback axiosThenCallback
 * @callback axiosCatchCallback
 */
function stagioneData(){
    document.getElementById('Stagione').addEventListener('change', function() {
        const selectedYear = this.value;

        // Set the min and max attribute of the "data" input
        const dateInput = document.getElementById('data');
        dateInput.min = `${selectedYear}-01-01`;
        dateInput.max = `${selectedYear}-12-31`;
        dateInput.value = '';
    });

    document.getElementById('Campionato').addEventListener('change', function() {
        const selectedOption = this.value;

        if (selectedOption !== "Tutti i Campionati") {
            axios.get('http://localhost:3000/competitions', {
                params: {
                    type: selectedOption
                }
            })
                .then(response => {
                    const data = response.data;
                    const selectCompetizione = document.getElementById('Competizione');

                    // Remove existing options
                    selectCompetizione.innerHTML = '';

                    // Create the "All Competitions" option
                    const allCompetitionsOption = document.createElement('option');
                    allCompetitionsOption.value = '';
                    allCompetitionsOption.textContent = 'All Competitions';
                    selectCompetizione.appendChild(allCompetitionsOption);

                    // Generate the select options
                    data.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item["name"];
                        option.textContent = COMPETITIONS[item["subType"]];
                        selectCompetizione.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Errore:', error);
                });
        }
    });
}

/**
 * Populates the 'Campionato' dropdown with options fetched from the 'Campionati' endpoint.
 *
 * This function makes a GET request to the 'Campionati' endpoint and uses the response data to populate the 'Campionato' dropdown with options.
 * Each option's text and value are set to the corresponding item from the response data.
 * If an error occurs during the request, it is logged to the console.
 *
 * @callback axiosThenCallback
 * @callback axiosCatchCallback
 */
function DropDownCampionato() {
    axios.get('http://localhost:3000/championships')
        .then(response => {
            const data = response.data;
            const selectStagione = document.getElementById('Campionato');

            // Generate the select options
            data.forEach(item => {
                const option = document.createElement('option');
                option.textContent = CHAMPIONSHIPS[item];
                option.value = item;
                selectStagione.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

/**
 * Makes an HTTP GET request to retrieve distinct seasons from 'http://localhost:3000/datiDistinti'.
 * Populates a <select> element with season options and sets min/max date attributes based on the retrieved data.
 */
function DropDownStagione() {
    axios.get('http://localhost:3000/selectSeasons')
        .then(response => {
            const data = response.data;
            const selectStagione = document.getElementById('Stagione');

            // Generate the select options
            data.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item;
                option.value = item;
                selectStagione.appendChild(option);
            });

            // After generating the options, get the minimum and maximum year
            const minYear = Math.min(...data);
            const maxYear = Math.max(...data);

            // Set the min and max attribute of the "data" input
            const dateInput = document.getElementById('data');
            dateInput.min = `${minYear}-01-01`;
            dateInput.max = `${maxYear}-12-31`;
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

/**
 * Listens for changes in the 'data' input element and sets the corresponding 'Stagione' select element
 * to match the selected year from the 'data' input.
 */
function dataStagione() {
    document.getElementById('data').addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const selectedYear = selectedDate.getFullYear();

        // Set the value of the "Stagione" select
        const selectStagione = document.getElementById('Stagione');
        const options = selectStagione.options;

        for (let i = 0; i < options.length; i++) {
            if (options[i].value === selectedYear) {
                selectStagione.selectedIndex = i;
                break;
            }
        }
    });
}

/**
 * Handles the output of data to an HTML element based on the provided response object.
 * If the data array is empty, displays an error message in the 'result' element.
 *
 * @param {Object} response - The HTTP response object containing data to be displayed.
 */
function OutputOnHTML(response){
    const data = response.data;
    console.log(response);
    const outputDiv = document.getElementById('result');
    const outputDivError = document.getElementById('result');
    outputDiv.innerHTML = '';

    // Check if the data array is empty
    if (data.length === 0) {
        outputDivError.style.color = 'black';
        outputDivError.style.fontSize = '40px';
        outputDivError.style.fontWeight = 'bold';
        outputDivError.style.display = 'flex';
        outputDivError.style.justifyContent = 'center';
        outputDivError.style.alignItems = 'center';
        outputDivError.style.width = '100%';
        outputDivError.textContent = 'La ricerca non ha generato risultati!';

        return;
    }

    // Add the data to the HTML
    data.forEach(match => {
        // Check if any of the values of the match are null
        if (Object.values(match).some(value => value === null)) {
            return;
        }
        // Create a new match div
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');

        // Add the first team
        const firstTeamDiv = document.createElement('div');
        firstTeamDiv.classList.add('firstTeam');
        firstTeamDiv.innerHTML = `
            <div class="teamLogo">
                <img src="https://tmssl.akamaized.net/images/wappen/head/${match.home_club_id}.png">
            </div>
            <div class="FirstTeamName">
                ${match.home_club_name}
            </div>
            <p class="result">${match.home_club_goals ?? 0}</p>
        `;
        matchDiv.appendChild(firstTeamDiv);

        // Add the second team
        const secondTeamDiv = document.createElement('div');
        secondTeamDiv.classList.add('secondTeam');
        secondTeamDiv.innerHTML = `
            <div class="teamLogo">
                <img src="https://tmssl.akamaized.net/images/wappen/head/${match.away_club_id}.png">
            </div>
            <div class="SecondTeamName">
                ${match.away_club_name}
            </div>
            <p class="result">${match.away_club_goals ?? 0}</p>
        `;
        matchDiv.appendChild(secondTeamDiv);

        // Add click event to the match div to open a new page with the game_id as a parameter
        matchDiv.addEventListener('click', function() {
            window.open(`game_page.html?game_id=${match.game_id}`, '_blank');
        });

        // Add the match div to the output div
        outputDiv.appendChild(matchDiv);
    });
}
