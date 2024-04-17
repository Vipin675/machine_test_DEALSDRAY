import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation.component";
import HomePage from "./routes/home/HomePage";
import LoginPage from "./routes/login/LoginPage";
import EmployeeListPage from "./routes/employee-list/EmployeeListPage";
import EmployeePage from "./routes/employee/EmployeePage";
import CreateEmployeePage from "./routes/create-employee/CreateEmployeePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employee-list" element={<EmployeeListPage />} />
          <Route path="/create-employee" element={<CreateEmployeePage />} />
          <Route path="/employee-list/:employeeId" element={<EmployeePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
