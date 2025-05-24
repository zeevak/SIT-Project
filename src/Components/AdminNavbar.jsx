import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav style={{ background: "#333", padding: "1rem", color: "#fff" }}>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "space-around",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add-fuel-station"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Add Fuel Station
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
