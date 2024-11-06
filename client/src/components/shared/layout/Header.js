import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Define styles for the header links
  const headerStyle = {
    position: 'fixed', 
    right: '100px', 
    top: '10px', 
    zIndex: 1000, 
  };

  const linkStyle = {
    textDecoration: 'underline', 
    color: 'blue', 
    fontSize: '1.25em'
  };

  const textStyle = {
    color: 'black',
    fontSize: '1.25em' 
  };

  return (
    <div style={headerStyle}>
      {/* Show "This is the link to Analytics" on specified pages */}
      {location.pathname === "/" 
       && (
        <div>
          <span style={textStyle}>This is the link to </span>
          <Link to="/analytics" style={linkStyle}>Analytics</Link>
        </div>
      )}

      {/* Show "This is the link to Home" only on the Analytics page */}
      {(location.pathname === "/analytics" ||
      location.pathname === "/donor" ||
      location.pathname === "/hospitals" ||
      location.pathname === "/donations" ||
      location.pathname === "/organisation" ||
      location.pathname === "/consumer" ||
      location.pathname === "/donor-list" ||
      location.pathname === "/hospital-list" ||
      location.pathname === "/org-list" )
      && (
        <div>
          <span style={textStyle}>This is the link to </span>
          <Link to="/" style={linkStyle}>Home</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
