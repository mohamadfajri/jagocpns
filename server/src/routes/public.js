const express = require('express');
const { getInformationByType } = require('../controllers/public/information');

const router = express.Router();

router.get('/public/information/:type', getInformationByType);

module.exports = router;
