const express = require('express');
const router = express.Router();
const axios = require('axios');
const ModelGames = require('../models/games/games');
const appearancesController =  require('../controllers/appearances');
const gamescontroller =  require('../controllers/games');
const gameLineUpController =  require('../controllers/gamelineups');
const gameeventscontroller =  require('../controllers/gameevents');
const userscontroller =  require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Get matches by query parameters
router.get('/queryPartite', function(req, res, next) {
    const { season = "", competition_type = "", competition_id = "", date = null } = req.query;

    gamescontroller.getMatches(season, competition_type, competition_id, date)
        .then(games => {
            if (!games || games.length === 0) {
                return res.status(404).json({ error: 'No matches found for these parameters' });
            }
            res.json(games);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to retrieve matches', details: error.message });
        });
});

// Get games by date
router.get('/gamesITByDate', function(req, res, next) {
    gamescontroller.getGamesITByDate()
        .then(games => {
            res.json(games);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get games by date
router.get('/gamesByDate', function(req, res, next) {
    gamescontroller.getGamesByDate()
        .then(games => {
            res.json(games);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get distinct seasons
router.get('/selectSeasons', function(req, res, next) {
    ModelGames.distinct('season')
        .then(seasons => {
            res.json(seasons);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get game by ID
router.get('/getGameById', function(req, res, next) {
    const game_id = req.query.game_id;
    if (!game_id) {
        return res.status(400).json({ error: 'game_id is required' });
    }
    gamescontroller.getGameById(game_id)
        .then(game => {
            if (!game) {
                return res.status(404).json({ error: 'No game found for this game_id' });
            }
            res.json(game);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get team stats by competition ID and season
router.get('/teamStats', function(req, res, next) {
    const { competition_id, season } = req.query;
    if (!competition_id || !season) {
        return res.status(400).json({ error: 'competition_id and season are required' });
    }
    gamescontroller.getTeamStats(competition_id, season)
        .then(teamStats => {
            if (!teamStats || teamStats.length === 0) {
                return res.status(404).json({ error: 'No team stats found for this competition_id and season' });
            }
            res.json(teamStats);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get matches by competition ID and season
router.get('/gamesByCompetitionAndSeason', (req, res) => {
    const competitionId = req.query.competition_id;
    const season = parseInt(req.query.season);
    if (!competitionId || !season) {
        return res.status(400).json({ error: 'competition_id and season are required' });
    }
    gamescontroller.getMatchesByCompetitionAndSeason(competitionId, season)
        .then(lineup => {
            if (!lineup || lineup.length === 0) {
                return res.status(404).json({ error: 'No matches found for this competition_id and season' });
            }
            res.json(lineup);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get player season stats by player ID
router.get('/playerSeason', (req, res) => {
    const playerId = parseInt(req.query.player_id); // Ensure player_id is parsed as an integer
    const playerName = String(req.query.player_name);
    console.log(`Searching player with ID or Name: ${playerId} || ${playerName}`);
    if (!playerId) {
        if (!playerName) return res.status(400).json({ error: 'player_id or player_name is required' });
    }
    if (playerId) appearancesController.getPlayerStats(playerId)
        .then(stats => {
            console.log(stats);
            if (!stats || stats.length === 0) {
                return res.status(404).json({ error: 'No stats found for this player_id' });
            }
            res.json(stats);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error', details: error.message });
        });
    else appearancesController.getPlayerByName(playerName)
        .then(stats => {
            console.log(stats);
            if (!stats || stats.length === 0) {
                return res.status(404).json({ error: 'No stats found for this player_name' });
            }
            res.json(stats);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error', details: error.message });
        });
});

// Get lineups by game ID and club ID
router.get('/getLineUps', (req, res) => {
    const { game_id, club_id } = req.query;
    if (!game_id || !club_id) {
        return res.status(400).json({ error: 'game_id and club_id are required' });
    }
    gameLineUpController.getLineupsByGameAndClub(game_id, club_id)
        .then(lineups => {
            if (!lineups || lineups.length === 0) {
                return res.status(404).json({ error: 'No lineups found for this game_id and club_id' });
            }
            res.json(lineups);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error', details: error.message });
        });
});

// Get game events by game ID
router.get('/getGameEventsByGameId', function(req, res, next) {
    const game_id = req.query.game_id;
    if (!game_id) {
        return res.status(400).json({ error: 'game_id is required' });
    }
    gameeventscontroller.getGameEventsByGameId(game_id)
        .then(gameevents => {
            console.log(gameevents);
            if (!gameevents || gameevents.length === 0) {
                return res.status(404).json({ error: 'No game events found for this game_id' });
            }
            res.json(gameevents);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


// User registration
router.post('/signup', userscontroller.register);

// User login
router.post('/login', userscontroller.login);

module.exports = router;
