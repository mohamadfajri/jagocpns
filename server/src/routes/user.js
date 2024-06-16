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

const router = express.Router();

router.get('/user', userOnly, getUser);
router.post('/user/profile', userOnly, createProfile);
router.post('/user/signup', createUser);
router.post('/user/signin', userSignin);
router.patch('/user/changepassword', changePassword);
router.post('/user/transaction', userOnly, createTransaction);
router.get('/user/transaction', userOnly, getTransactionStatus);

module.exports = router;
