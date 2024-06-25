const express = require('express');
const {
  createUser,
  getUser,
  userSignin,
  changePassword,
  createProfile,
} = require('../controllers/user/user');
const {
  createTransaction,
  getTransactionStatus,
} = require('../controllers/user/transaction');
const userOnly = require('../middlewares/userOnly');
const {
  getSoalByNumber,
  getSoalData,
  createAnswer,
  getAnswer,
  getIsAnswer,
  createScore,
} = require('../controllers/user/cbt');
const { getTryout } = require('../controllers/admin/tryoutList');
const ownerOnly = require('../middlewares/ownerOnly');

const router = express.Router();

router.get('/user', userOnly, getUser);
router.post('/user/profile', userOnly, createProfile);
router.post('/user/signup', createUser);
router.post('/user/signin', userSignin);
router.patch('/user/changepassword', changePassword);
router.post('/user/transaction', userOnly, createTransaction);
router.get('/user/transaction', userOnly, getTransactionStatus);
router.get('/user/cbt/:id/:num', ownerOnly, userOnly, getSoalByNumber);
router.get('/user/cbt-data/:id', userOnly, getSoalData);
router.post('/user/cbt', userOnly, createAnswer);
router.get('/user/get-answer', userOnly, getAnswer);
router.get('/user/get-answered', userOnly, getIsAnswer);
router.post('/user/finish/:toId', userOnly, createScore);
router.get('/user/getTryoutList', userOnly, getTryout);

module.exports = router;
