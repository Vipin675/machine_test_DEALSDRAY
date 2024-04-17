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

  if (!admin)
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password" });
  if (admin.f_Pwd !== f_Pwd)
    return res.status(401).send("Invalid username or password");

  let token = jwt.sign(
    { user: admin._id },
    process.env.JWT_SECRET_OR_PRIVATE_KEY
  );

  return res.cookie("accesToken", token, { httpOnly: true }).json({
    success: true,
    accessToken: token,
    currentUser: admin.f_userName,
  });
};

const verify = async (req, res) => {
  res.json({
    success: true,
  });
};

module.exports = { verify, loginAdmin, createAdmin }; // ... other admin functions
