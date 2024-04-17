import { useContext, useEffect, useState } from "react";
import "./employeeList.styles.css";
import { Link, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";

function getFormattedDate(date = new Date()) {
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day}-${monthNames[month - 1]}-${year}`;
}

const EmployeeListPage = () => {
  const { employeeList, fetchEmployees, handleEmployeeDelete } =
    useContext(EmployeeContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 3; // Change this value to set the number of items per page

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredItems = employeeList?.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="list-detail-container">
        <span>Total: {employeeList?.length}</span>
        <Link to="/create-employee">Create Employee</Link>
      </div>
      <div className="list-search-container">
        <span>Search</span>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Createdate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_gender}</td>
                <td>{employee.f_Course}</td>
                <td>{getFormattedDate(new Date(employee.f_Createdate))}</td>
                <td>
                  <Link to={`${employee._id}`}>Edit</Link>
                  <span
                    className="emp_delete_button"
                    onClick={() => {
                      handleEmployeeDelete(employee._id);
                      setCurrentPage(1);
                    }}
                  >
                    - delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="pagination">
        {filteredItems.length > itemsPerPage &&
          Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <li key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </li>
          ))}
      </ul>
    </>
  );
};

export default EmployeeListPage;
