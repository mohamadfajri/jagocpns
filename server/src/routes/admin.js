const express = require('express');
const {
  createAdmin,
  getAdmin,
  adminSignin,
} = require('../controllers/admin/admin');
const {
  getAllUser,
  searchUser,
  resetPassword,
  createOwnership,
  deleteOwnership,
} = require('../controllers/admin/crudUser');
const adminOnly = require('../middlewares/adminOnly');
const { createInformation } = require('../controllers/admin/information');
const {
  createTryout,
  getTryout,
  getTryoutById,
  updateTryout,
  deleteTryout,
  getTryouts,
  addTryoutToOwnership,
  getUserOwnershipList,
  deleteTryoutFromOwnership,
  getAllTryouts,
  getTryOutOwnershipCount,
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
const {
  createLink,
  deleteLink,
  getLinks,
} = require('../controllers/public/information');
const {
  getUserCount,
  getActiveUsers,
  getUserRegistrations,
  getUserSegment,
  getTransactionSummary,
  getTransactionVolume,
  getBalanceSummary,
  getTryoutParticipation,
  getAverageScores,
  getDashboardSummary,
  getMonthlyData,
} = require('../controllers/admin/analytic');
const {
  emailTestHandler,
  broadcastHandler,
} = require('../controllers/admin/mailer');
const router = express.Router();

router.post('/admin/signup', createAdmin);
router.post('/admin/signin', adminSignin);
router.get('/admin', adminOnly, getAdmin);
router.get('/admin/user/:page', adminOnly, getAllUser);
router.get('/admin/user/search/:search', adminOnly, searchUser);
router.post('/admin/information', adminOnly, createInformation);
router.post('/admin/tryout', adminOnly, upload, createTryout);
router.get('/admin/tryout', adminOnly, getAllTryouts);
router.get("/admin/tryoutownership/:tryoutListId", adminOnly, getTryOutOwnershipCount)
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
router.post('/admin/resetpassword', adminOnly, resetPassword);
router.post('/admin/createownership', adminOnly, createOwnership);
router.post('/admin/deleteownership', adminOnly, deleteOwnership);
router.post('/admin/link', adminOnly, upload, createLink);
router.delete('/admin/link/:id', adminOnly, deleteLink);
router.get('/admin/links', adminOnly, getLinks);
router.post('/admin/addTryout', adminOnly, addTryoutToOwnership);
router.get('/admin/addTryout/:userId', adminOnly, getUserOwnershipList);
router.delete(
  '/admin/addTryout/:userId/:tryoutListId',
  adminOnly,
  deleteTryoutFromOwnership
);
router.post('/admin/test-mail', adminOnly, emailTestHandler);
router.post('/admin/broadcast', adminOnly, broadcastHandler);

//analytic

router.get('/admin/users/count', adminOnly, getUserCount);
router.get('/admin/users/active', adminOnly, getActiveUsers);
router.get('/admin/users/registrations', adminOnly, getUserRegistrations);
router.get('/admin/users/segment', adminOnly, getUserSegment);

router.get('/admin/transactions/summary', adminOnly, getTransactionSummary);
router.get('/admin/transactions/volume', adminOnly, getTransactionVolume);

router.get('/admin/balance/summary', adminOnly, getBalanceSummary);

router.get('/admin/tryouts/participation', adminOnly, getTryoutParticipation);
router.get('/admin/tryouts/scores/average', adminOnly, getAverageScores);

router.get('/admin/dashboard/summary', adminOnly, getDashboardSummary);
router.get('/admin/charts/monthly-data', adminOnly, getMonthlyData);

module.exports = router;
