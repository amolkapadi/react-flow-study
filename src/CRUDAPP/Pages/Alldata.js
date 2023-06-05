import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import {Link} from 'react-router-dom'
export default function Alldata() {
  const [user, setUser] = useState([]);
  const getData = async () => {
    const result = await axios.get("http://localhost:8001/Data");
    setUser(result.data.reverse());
  };

  useEffect(() => {
    getData();
  }, []);

  //delete user
  const deleteUser =async (id)=>{
      await axios.delete(`http://localhost:8001/Data/${id}`);
      getData();  //after delte data load the old data 
  }

  return (
    <section className="bg-primary">
      <div className="container pb-5">
        <h3 className="text-center pt-5 text-white pb-5">All Information</h3>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {
          user.length > 0 ? (user.map((value,index) => {
            return (
              <div className="col" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">ID : {index + 1}</h5>
                    <h5 className="card-text">Name: {value.name}</h5>
                    <h5 className="card-text">User Name: {value.username}</h5>
                    <h5 className="card-text">Email: {value.email}</h5>
                    <h5 className="card-text">Position: {value.position}</h5>
                  </div>
                  <div className="d-flex justify-content-around pb-2 ">
                 <Link to={`/edituser/${value.id}`}><i className="bi bi-pencil-square"></i> </Link> 
                  <i className="bi bi-trash3-fill" onClick={()=>deleteUser(value.id)}></i>
                  </div>
                </div>
              </div>
            );
          })):(
            <h1 className="text-white">No User Found</h1>
          )
          }
        </div>
      </div>
    </section>
  );
}
