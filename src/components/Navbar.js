import React from "react";
import { Navbar as Navigation, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Navigation bg="dark" variant="dark" className="mb-3">
      <div className="container">
        <Navigation.Brand href="/">ExerciseTracker</Navigation.Brand>
        <Nav className="d-none d-sm-flex">
          <Link to="/" className="nav-link">
            Exercises
          </Link>
          <Link to="/create" className="nav-link">
            Create Exercise Log
          </Link>
          <Link to="/user" className="nav-link">
            Create User
          </Link>
        </Nav>
      </div>
    </Navigation>
  );
}

export default Navbar;
