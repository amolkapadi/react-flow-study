import React from "react";
import { NavLink,Link } from "react-router-dom"

import "./Navbar.css";
export default function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <Link class="navbar-brand" to="/">
            CRUD APP REACT 
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-collection-fill"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NavLink className="btn btn-primary mb-3" to='/adduser'>Add User</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
