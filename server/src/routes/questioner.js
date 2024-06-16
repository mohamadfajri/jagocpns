const express = require('express');
const {
  createQuestioner,
  getQuestioner,
  questionerSignin,
} = require('../controllers/questioner/questioner');
const questionerOnly = require('../middlewares/questionerOnly');
const router = express.Router();

router.post('/questioner/signup', createQuestioner);
router.post('/questioner/signin', questionerSignin);
router.get('/questioner/:id', questionerOnly, getQuestioner);

module.exports = router;
