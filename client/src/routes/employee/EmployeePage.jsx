import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";

const EmployeePage = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const { updateEmployee, currentEmployee, getEmployeeDetail } =
    useContext(EmployeeContext);
  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getEmployeeDetail(employeeId);
  }, [employeeId]);

  const [formData, setFormData] = useState({
    id: employeeId,
    f_Name: currentEmployee.f_Name,
    f_Email: currentEmployee.f_Email,
    f_Mobile: currentEmployee.f_Mobile,
    f_Designation: currentEmployee.f_Designation,
    f_gender: currentEmployee.f_gender,
    f_Course: currentEmployee.f_Course,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="f_Name"
            value={formData.f_Name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="f_Email"
            value={formData.f_Email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mobile No:
          <input
            type="number"
            name="f_Mobile"
            value={formData.f_Mobile}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Designation:
          <select
            name="f_Designation"
            value={formData.f_Designation}
            onChange={handleChange}
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
            checked={formData.f_gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="f_gender"
            value="female"
            checked={formData.f_gender === "Memale"}
            onChange={handleChange}
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
            checked={formData.f_Course?.includes("BSC")}
            onChange={handleChange}
          />
          BSC
          <input
            type="checkbox"
            name="f_Course"
            value="BCA"
            checked={formData.f_Course?.includes("BCA")}
            onChange={handleChange}
          />
          BCA
          <input
            type="checkbox"
            name="f_Course"
            value="MCA"
            checked={formData.f_Course?.includes("MCA")}
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
