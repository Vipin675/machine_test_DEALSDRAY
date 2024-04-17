import React, { createContext, useState, useEffect } from "react";

const EmployeeContext = createContext({
  currentEmployee: null,
  setCurrentEmployee: () => {},
  employeeList: [],
  setEmployeeList: () => {},
  // Add more context properties as needed (e.g., employee roles, departments)
});

const EmployeeProvider = ({ children }) => {
  const [currentEmployee, setCurrentEmployee] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
  });
  const [employeeList, setEmployeeList] = useState([]);

  // Fetch employee data on initial load (replace with your actual API endpoint)
  const fetchEmployees = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }); // Replace with your backend URL
      const data = await response.json();
      setEmployeeList(data.employees);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (newEmployeeData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:5000/api/employees", {
        // Replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newEmployeeData),
      });

      const data = await response.json();

      if (data.success) {
        setEmployeeList([...employeeList, data.employee]); // Update employee list in context
        console.log("Employee created successfully!");
        // Optionally clear the form or redirect to a different page
      } else {
        console.error("Failed to create employee:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateEmployee = async (updatedEmployeeData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5000/api/employees/${updatedEmployeeData.id}`,
        {
          // Replace with your backend URL and adjust method if needed (e.g., PUT for update)
          method: "PUT", // Adjust method based on your backend API
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedEmployeeData),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update employee list with the updated data
        const updatedList = employeeList.map((emp) =>
          emp.id === updatedEmployeeData.id ? updatedEmployeeData : emp
        );
        setEmployeeList(updatedList);

        alert("Employee updated successfully!");
      } else {
        alert("Failed to update employee:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployeeDetail = async (employeeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ); // Replace with your backend URL
      const data = await response.json();

      if (data.success) {
        setCurrentEmployee(data.employee); // Update currentEmployee as well
        console.log("Employee details fetched successfully!");
      } else {
        console.error("Failed to fetch employee details:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmployeeDelete = async (employeeId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${employeeId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ); // Replace with your backend URL
      const data = await response.json();
      fetchEmployees();

      if (data.success) {
        alert("Employee deleted!");
      } else {
        alert("Failed delete employee");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    employeeList,
    setEmployeeList,
    updateEmployee,
    currentEmployee,
    setCurrentEmployee,
    getEmployeeDetail,
    addEmployee,
    fetchEmployees,
    handleEmployeeDelete,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
