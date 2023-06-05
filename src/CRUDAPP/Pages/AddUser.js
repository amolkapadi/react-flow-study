import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import "./style.css";

import { useNavigate } from "react-router-dom";
export default function AddUser() {
  //use Navigate
  const navigate = useNavigate();

  const [user, setuser] = useState({
    name: "",
    username: "",
    email: "", 
    position:""
  });

  //object destruction
  const { name, username, email, position} = user;

  //handle change event input form
  const handleChange = (e) => {
    console.log(e.target.value);
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  //onsubmit event on form
  const onSubmit = async (e) => {
    e.preventDefault(); //page not refresh when click on submit btn
    await axios.post("http://localhost:8001/Data", user);
    navigate("/");
  };
  return (
    <section className="bg-primary2">
      <div className="container">
      <Link className="text-white" to="/">Back to home</Link>
        <h3 className="text-center text-white pt-5 py-5">Add User</h3>
        <form
          className="w-50 mx-auto border border-white p-3"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
              Position
            </label>
            <select className="form-select" aria-label="Default select example" 
            name="position" 
            onChange={(e) => handleChange(e)}>
              <option selected>Select Position</option>
              <option value="Full-Stack">Full-Stack</option>
              <option value="Backend">Backend</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button type="submit" className="submit-btn ">
            Submit
          </button>
        
        </form>
       
      </div>
    </section>
  );
}
