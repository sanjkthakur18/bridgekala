const express = require("express");
const { createUserCtrl, loginUserCtrl, userLogoutCtrl, adminLoginCtrl, adminLogoutCtrl, createAdminCtrl } = require("../controller/authCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes for Executive
router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.patch("/logout", authMiddleware, userLogoutCtrl);

// Routes for Admin
router.post("/admin/register", createAdminCtrl);
router.post("/admin/login", adminLoginCtrl);
router.patch("/admin/logout", authMiddleware, isAdmin, adminLogoutCtrl);

module.exports = router;