const express = require('express');

const leaderBoardController = require('../controllers/leaderboardController')

const router = express.Router();

router.get('/leaderboard', leaderBoardController.leaderboard);

module.exports = router;