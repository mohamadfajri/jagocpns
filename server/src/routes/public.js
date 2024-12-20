const express = require("express");
const {
  getInformationByType,
  getLinks,
} = require("../controllers/public/information");
const {
  getUserRankingsByTryout,
  getUserRankById,
} = require("../controllers/public/ranking");
const { createOwnerr } = require("../controllers/public/user");
const {
  getAllTryout,
  getTryoutById,
  getFreeTryouts,
  getIsOnlineStatus,
  getTryoutByBatch,
  getAllBimbel,
} = require("../controllers/public/tryoutList");
const {
  forgotPasswordHandler,
  resetPasswordHandler,
} = require("../controllers/public/forgotpassword");
const { getUserCount } = require("../controllers/admin/analytic");

const router = express.Router();

router.get("/public/information/:type", getInformationByType);
router.get("/public/rank", getUserRankingsByTryout);
router.get("/public/rank/tryout/:tryoutListId/user/:id", getUserRankById);
router.get("/public/tryouts", getAllTryout);
router.get("/public/getbatch/:batch", getTryoutByBatch);
router.get("/public/tryout/:id", getTryoutById);
router.get("/public/freetryouts", getFreeTryouts);
router.get("/public/bimbel", getAllBimbel)
router.get("/public/links", getLinks);
router.get("/public/isOnlineTryout/:id", getIsOnlineStatus);
router.post("/public/forgot-password", forgotPasswordHandler);
router.post("/public/reset-password", resetPasswordHandler);
router.get("/public/usercount", getUserCount);

module.exports = router;
