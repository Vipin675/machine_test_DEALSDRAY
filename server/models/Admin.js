const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  f_sno: { type: Number, required: true, unique: true }, // Assuming f_sno is an auto-incrementing integer
  f_userName: { type: String, required: true, unique: true },
  f_Pwd: { type: String, required: true }, // Plain text password storage (not recommended for production)
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
