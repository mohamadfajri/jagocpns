const express = require("express");
const {
  createUser,
  getUser,
  userSignin,
  changePassword,
  createProfile,
  getTryoutByUserId,
  getBimbelByUserId,
  getUserTryOutById,
  getSummary,
  updateProfile,
  getTryoutListForRanking,
} = require("../controllers/user/user");
const {
  createTransaction,
  getTransactionStatus,
  getTransaction,
  createVerification,
  checkout,
  cancelTransaction,
  getSuccessTransaction,
  getUserTrasactions,
} = require("../controllers/user/transaction");
const userOnly = require("../middlewares/userOnly");
const {
  getSoalByNumber,
  getSoalData,
  createAnswer,
  getAnswer,
  getIsAnswer,
  createScore,
  getAllSoalById,
  resetTryout
} = require("../controllers/user/cbt");
const { getTryout, getAllTryouts } = require("../controllers/admin/tryoutList");
const ownerOnly = require("../middlewares/ownerOnly");
const {
  createFreeForm,
  getFormByUserId,
  checkOwnership,
} = require("../controllers/admin/freeform");
const { getReview, getUserAnswer } = require("../controllers/user/review");
const upload = require("../utils/multer");
const { searchEmail } = require("../controllers/public/email");
const { getUserScoreById } = require("../controllers/user/score");

const router = express.Router();

router.get("/user", userOnly, getUser);
router.post("/user/profile", userOnly, createProfile);
router.get("/user/summary", userOnly, getSummary);
router.post("/user/signup", createUser);
router.post("/user/signin", userSignin);
router.patch("/user/changepassword", userOnly, changePassword);
router.patch("/user/updateprofile", userOnly, updateProfile);
router.post("/user/transaction", userOnly, createTransaction);
router.delete("/user/transaction", userOnly, cancelTransaction);
router.post("/user/transaction/verify", userOnly, upload, createVerification);
router.get("/user/transaction", userOnly, getTransactionStatus);
router.get("/user/transaction/data", userOnly, getTransaction);
router.get("/user/transaction/success", userOnly, getSuccessTransaction);

router.get("/user/getusertransaction", userOnly, getUserTrasactions);

router.get("/user/cbt/:id/:num", ownerOnly, userOnly, getSoalByNumber);
router.get("/user/cbt-data/:id", userOnly, getSoalData);
router.post("/user/answer/:id", ownerOnly, userOnly, createAnswer);
router.get("/user/get-answer", userOnly, getAnswer);
router.get("/user/get-answered", userOnly, getIsAnswer);
router.get("/user/getallsoal/:id", ownerOnly, userOnly, getAllSoalById);
router.post("/user/finish/:toId", userOnly, createScore);
router.get("/user/getTryoutList", userOnly, getAllTryouts);
router.get("/user/getTryoutListForRanking", userOnly, getTryoutListForRanking)
router.post("/user/free/:tryoutListId", userOnly, createFreeForm);
router.get("/user/free", userOnly, getFormByUserId);
router.get("/user/freeOwnership/:tryoutListId", userOnly, checkOwnership);
router.get("/user/review/:tryoutListId", userOnly, getReview);
router.get("/user/search", userOnly, searchEmail);
router.post("/user/checkout", userOnly, checkout);
router.get("/user/mytryout", userOnly, getTryoutByUserId);
router.get("/user/mybimbel", userOnly, getBimbelByUserId);
router.get("/user/mylist/:tryoutListId", userOnly, getUserTryOutById);
router.get("/user/review/answer/:tryoutListId", userOnly, getUserAnswer);
router.get("/user/myscore/:tryoutListId", userOnly, getUserScoreById);
router.post('/user/tryout/reset',userOnly, resetTryout);

module.exports = router;
