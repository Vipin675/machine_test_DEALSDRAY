import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Welcom {localStorage.getItem("currentUser")}</div>;
};

export default HomePage;
