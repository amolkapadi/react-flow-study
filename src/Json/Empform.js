import React,{useState} from "react";
import axios from 'axios'

function Empform() {
    const [data,setData]=useState({
        name:"",
        username:"",
        email:""
    })

    const handleChange=(event)=>{
        console.log(event)
        setData(()=>({
            ...data,[event.target.name]:event.target.value
        }))
    }
    const handleClick=async (e)=>{
        await axios.post("http://localhost:8001/Data" ,data);
    }
  return (
    <div className="container">
        <h3 className="text-center">Please Fill-up the Details</h3>
      <form onSubmit={(e)=>handleClick(e)} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
          value={data.name}
            type="text"
            onChange={handleChange}
            name='name'
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            User Name
          </label>
          <input
          value={data.username}
            type="text"
            onChange={handleChange}
            name="username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
          value={data.email}
            type="email"
            className="form-control"
            onChange={handleChange}
            name="email"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Empform;
