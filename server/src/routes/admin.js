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
} = require('../controllers/admin/tryoutList');
const upload = require('../utils/multer');
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

module.exports = router;
