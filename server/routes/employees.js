const express = require("express");

const { verifyAdmin } = require("../middleware/verifyAdmin");

const employeesController = require("../controllers/employees");

const router = express.Router();

// Create Employee
router.post("/", verifyAdmin, employeesController.createEmployee);

// Get All Employees
router.get("/", verifyAdmin, employeesController.getEmployees);

// Get Single Employee by ID
router.get("/:id", verifyAdmin, employeesController.getEmployeeById);

// Update Employee by ID
router.put("/:id", verifyAdmin, employeesController.updateEmployee);

// Delete Employee by ID
router.delete("/:id", verifyAdmin, employeesController.deleteEmployee);

module.exports = router;
