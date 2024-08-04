const express = require("express");
const { createStock, getStockById, getStocks, updateStock, deleteStock } = require("../controller/stockCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getStocks", getStocks);
router.get("/:id", getStockById);
router.post("/admin", authMiddleware, isAdmin, createStock);
router.delete("/admin/:id", authMiddleware, isAdmin, deleteStock);
router.patch("/admin/:id", authMiddleware, isAdmin, updateStock);

module.exports = router;