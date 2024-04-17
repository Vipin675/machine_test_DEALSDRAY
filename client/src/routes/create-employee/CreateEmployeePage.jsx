import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";

const CreateEmployeePage = () => {
  const navigate = useNavigate();
  const { addEmployee } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "HR",
    f_gender: "Male",
    f_Course: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevFormData[name], value]
            : prevFormData[name].filter((val) => val !== value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(formData);
    navigate("/employee-list");
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
            <option value="Sales">Sales</option>
          </select>
        </label>
        <br />
        <label>
          Gender:
          <input
            type="radio"
            name="f_gender"
            value="Male"
            checked={formData.f_gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            name="f_gender"
            value="Female"
            checked={formData.f_gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
        </label>
        <br />
        <label>
          Course:
          <input
            type="radio"
            name="f_Course"
            value="BSC"
            checked={formData.f_Course === "BSC"}
            onChange={handleChange}
          />
          BSC
          <input
            type="radio"
            name="f_Course"
            value="BCA"
            checked={formData.f_Course === "BCA"}
            onChange={handleChange}
          />
          BCA
          <input
            type="radio"
            name="f_Course"
            value="MCA"
            checked={formData.f_Course === "MCA"}
            onChange={handleChange}
          />
          MCA
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployeePage;
