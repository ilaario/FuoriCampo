var express = require('express');
var router = express.Router();
var axios = require('axios');
const {getJson} = require("serpapi");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('', { title: 'Express' });
});

// Single Match Player
router.get('/getGameEventsByGameId', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/getGameEventsByGameId', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        // Gestione dell'errore
        if (error.response) {
            // Il server ha risposto con uno stato di errore
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            // La richiesta è stata effettuata ma non c'è stata alcuna risposta
            res.status(500).json({ error: 'No response from server.' });
        } else {
            // Qualcosa è andato storto nella configurazione della richiesta
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/getGameById', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/getGameById', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/getLineUps', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/getLineUps', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

// Competitions
router.get('/allCompetitions', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:8080/competitions/allCompetitions', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

// Clubs
router.get('/clubs', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/clubs/getAllClubs');
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

// Matches
router.get('/queryPartite', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/queryPartite', { params });
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/competitions', async (req, res) => {
    const params = req.query;
    if (params.type !== '' && params.type !== 'null') {
        try {
            const response = await axios.get('http://localhost:8080/competitions/getCompetitionsByType', { params });
            console.log('Ecco la risposta del server', response.data);
            res.json(response.data);
        } catch (error) {
            console.error('Errore:', error);
            res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
        }
    } else {
        try {
            const response = await axios.get('http://localhost:8080/competitions/getAllCompetitionsDTO');
            console.log('Ecco la risposta del server', response.data);
            res.json(response.data);
        } catch (error) {
            console.error('Errore:', error);
            res.status(500).json({error: 'An error occurred while fetching data from the server.'});
        }
    }
});

router.get('/championships', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/competitions/getAllChampionships');
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

router.get('/selectSeasons', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/selectSeasons', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

// Home
router.get('/gamesByDate', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/gamesByDate', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

router.get('/gamesITByDate', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/gamesITByDate', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

router.get('/highestValuePlayers', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:8080/players/getTop10Players', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

router.get('/bestTeams', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:8080/clubs/getBestClubs', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the server.' });
    }
});

// Single Player Page
router.get('/playerData', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:8080/players/getPlayerById', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/playerSeason', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/playerSeason', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

// Team Page
router.get('/teamData', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:8080/clubs/getClubById', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/teamPlayers', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:8080/players/getPlayerByCurrentClubId', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

// Login and SignUp
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.query;
    const params = { username, password, email };
    try {
        const response = await axios.post('http://localhost:3001/signup', null, { params });
        console.log('Ecco la risposta del server', response.data);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.query;
    const params = { email, password };
    console.log('Ecco i parametri CLIENTINDEX:', params)
    try {
        const response = await axios.post('http://localhost:3001/login', null, { params });
        console.log('Ecco la risposta del server', response.data);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

// Single Competition Page
router.get('/teamStats', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/teamStats', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/gamesByCompetitionAndSeason', async (req, res) => {
    const params = req.query;
    try {
        const response = await axios.get('http://localhost:3001/gamesByCompetitionAndSeason', { params });
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

// Players
router.get('/players', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/players/getAllPlayers');
        console.log('Ecco la risposta del server', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Errore:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response from server.' });
        } else {
            res.status(500).json({ error: 'An error occurred while making the request.' });
        }
    }
});

router.get('/api/football-news', async (req, res) => {
    try {
        const params = {
            engine: "google_news",
            // q: "soccer OR \"Premier League\" OR \"Serie A\" OR \"La Liga\" OR \"Champions League\" OR \"football (soccer)\"",
            q: "calcio OR Serie A OR Premier League OR La Liga OR Champions League OR football (soccer)",
            api_key: "c9949d6530159188d74376fd1b419987baf4f2dbe57ac4710f9736e07ec4a9f1" // Inserisci qui la tua chiave API SerpApi
        };

        const response = await getJson(params);

        // Filtra le notizie per escludere quelle che hanno un campo 'stories'
        const filteredNews = response["news_results"].filter(article => !article.stories);

        // Limita il numero di articoli a 10
        const limitedNews = filteredNews.slice(0, 10);
        console.log('Ecco la risposta del server', limitedNews);
        res.json(limitedNews); // Invia solo i primi 10 risultati
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recuperare le notizie' });
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;


