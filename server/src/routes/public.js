const express = require('express');
const { getInformationByType } = require('../controllers/public/information');
const { getUserRankingsByTryout } = require('../controllers/public/ranking');
const { createOwnerr } = require('../controllers/public/user');

const router = express.Router();

router.get('/public/information/:type', getInformationByType);
router.get('/public/rank', getUserRankingsByTryout);
router.post('/createowner', createOwnerr);

module.exports = router;
