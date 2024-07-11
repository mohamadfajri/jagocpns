const express = require('express');
const {
  createAdmin,
  getAdmin,
  adminSignin,
} = require('../controllers/admin/admin');
const { getAllUser, searchUser } = require('../controllers/admin/crudUser');
const adminOnly = require('../middlewares/adminOnly');
const { createInformation } = require('../controllers/admin/information');
const {
  createTryout,
  getTryout,
  getTryoutById,
  updateTryout,
  deleteTryout,
  getTryouts,
} = require('../controllers/admin/tryoutList');
const upload = require('../utils/multer');
const {
  getAllFreeForm,
  confirmRequest,
  deleteRequest,
  confirmAll,
  handleDeleteAll,
} = require('../controllers/admin/freeform');
const {
  getAllTransactions,
  acceptTransaction,
  rejectTransaction,
} = require('../controllers/admin/transaction');
const router = express.Router();

router.post('/admin/signup', createAdmin);
router.post('/admin/signin', adminSignin);
router.get('/admin', adminOnly, getAdmin);
router.get('/admin/user/:page', adminOnly, getAllUser);
router.get('/admin/user/search/:search', adminOnly, searchUser);
router.post('/admin/information', adminOnly, createInformation);
router.post('/admin/tryout', adminOnly, upload, createTryout);
router.get('/admin/tryout', adminOnly, getTryout);
router.get('/admin/tryout/:id', adminOnly, getTryoutById);
router.patch('/admin/tryout/:id', adminOnly, upload, updateTryout);
router.delete('/admin/tryout/:id', adminOnly, deleteTryout);
router.get('/admin/freeform', adminOnly, getAllFreeForm);
router.post('/admin/accform', adminOnly, confirmRequest);
router.delete('/admin/deleteform/:id', adminOnly, deleteRequest);
router.post('/admin/confirmallform', adminOnly, confirmAll);
router.delete('/admin/deleteallform', adminOnly, handleDeleteAll);
router.get('/admin/transaction', adminOnly, getAllTransactions);
router.get('/admin/showtryouts/:tryoutListId', adminOnly, getTryouts);
router.post('/admin/transaction', adminOnly, acceptTransaction);
router.delete('/admin/transaction/:id', adminOnly, rejectTransaction);

module.exports = router;
