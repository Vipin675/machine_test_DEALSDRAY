const { Employee } = require("../models/Employee"); // Import Employee model

// Create Employee
const createEmployee = async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
    req.body;

  const existingEmployee = await Employee.findOne({ f_Email });
  if (existingEmployee) return res.status(400).send("Email already exists");

  const employee = new Employee({
    f_Name,
    f_Email,
    f_Mobile,
    f_Designation,
    f_gender,
    f_Course,
  });
  await employee.save();

  res.send(employee);
};

// Get All Employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
};

// Get Single Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);
  if (!employee) return res.status(404).send("Employee not found");

  res.send(employee);
};

// Update Employee by ID
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!employee) return res.status(404).send("Employee not found");

  res.send(employee);
};

// Delete Employee by ID
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) return res.status(404).send("Employee not found");

  res.send({ message: "Employee deleted successfully!" });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
