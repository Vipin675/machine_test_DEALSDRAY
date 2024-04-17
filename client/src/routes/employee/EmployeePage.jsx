import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";

const EmployeePage = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const {
    updateEmployee,
    currentEmployee,
    setCurrentEmployee,
    getEmployeeDetail,
  } = useContext(EmployeeContext);

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getEmployeeDetail(employeeId);
  }, [employeeId]);

  const handleChange = (e) => {
    setCurrentEmployee({
      id: employeeId,
      ...currentEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(currentEmployee);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="f_Name"
            value={currentEmployee.f_Name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="f_Email"
            value={currentEmployee.f_Email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Mobile No:
          <input
            type="number"
            name="f_Mobile"
            value={currentEmployee.f_Mobile}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Designation:
          <select
            name="f_Designation"
            value={currentEmployee.f_Designation}
            onChange={handleChange}
            required
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
        </label>
        <br />
        <label>
          Gender:
          <input
            type="radio"
            name="f_gender"
            value="male"
            checked={currentEmployee.f_gender === "male"}
            onChange={handleChange}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="f_gender"
            value="female"
            checked={currentEmployee.f_gender === "female"}
            onChange={handleChange}
            required
          />{" "}
          Female
        </label>
        <br />
        <label>
          Course:
          <input
            type="checkbox"
            name="f_Course"
            value="BSC"
            checked={currentEmployee.f_Course?.includes("BSC")}
            onChange={handleChange}
          />
          BSC
          <input
            type="checkbox"
            name="f_Course"
            value="BCA"
            checked={currentEmployee.f_Course?.includes("BCA")}
            onChange={handleChange}
          />
          BCA
          <input
            type="checkbox"
            name="f_Course"
            value="MCA"
            checked={currentEmployee.f_Course?.includes("MCA")}
            onChange={handleChange}
          />
          MCA
        </label>
        <br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EmployeePage;
