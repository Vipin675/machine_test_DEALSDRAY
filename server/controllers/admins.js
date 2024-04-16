const jwt = require("jsonwebtoken");

const { Admin } = require("../models/Admin"); // Import Admin model

// Create separate functions for each admin-related API endpoint
const createAdmin = async (req, res) => {
  const { f_sno, f_userName, f_Pwd } = req.body;

  const existingAdmin = await Admin.findOne({ f_userName });
  if (existingAdmin) return res.status(400).send("Username already exists");

  const admin = new Admin({ f_sno, f_userName, f_Pwd });
  await admin.save();

  res.send({ message: "Admin created successfully!" });
};

const loginAdmin = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  const admin = await Admin.findOne({ f_userName });

  if (!admin) return res.status(401).send("Invalid username or password");
  if (admin.f_Pwd !== f_Pwd)
    return res.status(401).send("Invalid username or password");

  let token = jwt.sign(
    { user: admin._id },
    process.env.JWT_SECRET_OR_PRIVATE_KEY
  );

  return res.cookie("access_token", token, { httpOnly: true }).json({
    success: true,
    message: `Welcome ${admin.f_userName}`,
  });
};

// ... Add other admin-related functions (Update, Delete)

module.exports = { loginAdmin, createAdmin }; // ... other admin functions
