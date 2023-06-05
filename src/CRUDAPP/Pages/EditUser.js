import React,{useState,useEffect} from "react";
import axios from 'axios'
import "./style.css";

import {useNavigate,useParams} from "react-router-dom"
export default function EditUser() {
//use Navigate
const navigate=useNavigate();

// getid
let { id } = useParams();
  const [user,setuser]=useState({
    name:"",
    username:"",
    email:""
  })

  //object destruction
  const { name, username, email} = user;

  //handle change event input form
  const  handleChange=(e)=>{
    console.log(e.target.value);
    setuser({...user,[e.target.name]:e.target.value})
  }

  //onsubmit event on form
  const onSubmit= async (e)=>{
    e.preventDefault();   //page not refresh when click on submit btn
    await axios.put(`http://localhost:8001/Data/${id}`,user)
    navigate('/');
  }

  //loaduser function for edit
  const getData = async () => {
    const result = await axios.get(`http://localhost:8001/Data/${id}`);
    setuser(result.data);
  };

  useEffect(()=>{
    getData();
  },[])
  
  return (
 <section className="bg-primary2">
       <div className="container">
      <h3 className="text-center text-white pt-5 py-5">Edit User</h3>
      <form className="w-50 mx-auto border border-white p-3" onSubmit={(e)=>onSubmit(e)} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" name="name"  value={name} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            User Name
          </label>
          <input type="text" className="form-control" name="username"  value={username} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" name="email" value={email} onChange={(e)=>handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
              Position
            </label>
            <select class="form-select" aria-label="Default select example" 
            name="position"
            onChange={(e) => handleChange(e)}>
              <option selected>Select Position</option>
              <option value="Full-Stack">Full-Stack</option>
              <option value="Backend">Backend</option>
              <option value="Java">Java</option>
            </select>
          </div>
        <button type="submit" className="submit-btn ">
          Update User
        </button>
      </form>
    </div>
 </section>
  );
}
