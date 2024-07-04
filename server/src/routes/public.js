const express = require('express');
const {
  getInformationByType,
  getLinks,
} = require('../controllers/public/information');
const { getUserRankingsByTryout } = require('../controllers/public/ranking');
const { createOwnerr } = require('../controllers/public/user');
const {
  getAllTryout,
  getTryoutById,
  getFreeTryouts,
} = require('../controllers/public/tryoutList');

const router = express.Router();

router.get('/public/information/:type', getInformationByType);
router.get('/public/rank', getUserRankingsByTryout);
router.get('/public/tryouts', getAllTryout);
router.get('/public/tryout/:id', getTryoutById);
router.get('/public/freetryouts', getFreeTryouts);
router.get('/public/links', getLinks);

module.exports = router;
