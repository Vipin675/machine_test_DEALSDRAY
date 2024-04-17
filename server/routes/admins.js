const express = require("express");

const { verifyAdmin } = require("../middleware/verifyAdmin");

const adminsController = require("../controllers/admins");

const router = express.Router();

router.post("/create", adminsController.createAdmin); // Signup endpoint

router.post("/login", adminsController.loginAdmin); // Signup endpoint

router.get("/verify", verifyAdmin, adminsController.verify); // Signup endpoint

// ... Add other admin-related routes

module.exports = router;
