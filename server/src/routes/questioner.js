const express = require('express');
const {
  createQuestioner,
  getQuestioner,
  questionerSignin,
} = require('../controllers/questioner/questioner');
const questionerOnly = require('../middlewares/questionerOnly');
const { getTryout } = require('../controllers/admin/tryoutList');
const {
  createSoal,
  getSoalByNumber,
} = require('../controllers/questioner/editor');
const upload = require('../utils/multer');
const router = express.Router();

router.post('/questioner/signup', createQuestioner);
router.post('/questioner/signin', questionerSignin);
router.get('/questioner/:id', questionerOnly, getQuestioner);
router.get('/tryoutlist', questionerOnly, getTryout);
router.post('/tryout-editor/:id', questionerOnly, upload, createSoal);
router.get('/tryout/:id/:number', questionerOnly, getSoalByNumber);

module.exports = router;
