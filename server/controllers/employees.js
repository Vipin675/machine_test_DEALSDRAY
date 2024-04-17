const { Employee } = require("../models/Employee"); // Import Employee model

// Create Employee
const createEmployee = async (req, res) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
      req.body;

    const existingEmployee = await Employee.findOne({ f_Email });
    if (existingEmployee)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const employee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    });
    await employee.save();

    res.json({ success: true, employee });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json({ success: true, employees });
};

// Get Single Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);
  if (!employee)
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });

  res.json({ success: true, employee });
};

// Update Employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });

    res.json({ success: true, employee, message: "Employee updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Employee by ID
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  const employee = await Employee.findByIdAndDelete(id);
  if (!employee)
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });

  res.send({ success: true, message: "Employee deleted successfully!" });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
