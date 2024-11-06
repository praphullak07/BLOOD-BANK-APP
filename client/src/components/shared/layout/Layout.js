import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header"; // Import the Header component

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "auth/logout" });
    navigate("/login");
  };

  return (
    <div className="layout">
      <Sidebar />
      <Header /> {/* Include the Header here */}
      <div className="content">
        <div className="header">
          {/* Logout Button in Header Area */}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        
        {/* Render the page content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
