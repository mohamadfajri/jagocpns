const express = require('express');
const { createAdmin } = require('../controllers/admin');
const router = express.Router();

router.post('/admin', createAdmin);

module.exports = router;
