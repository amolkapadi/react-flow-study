import React, { useState, useEffect } from "react";

function Emp() {
  const [user, setUser] = useState([]);

  const getData = async () => {
    const result = await fetch("http://localhost:8001/Data");
    const res = await result.json();
    setUser(res);
    console.log(res);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container pt-5">
      <h3>Employee Data</h3>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
                         
        {user.map((value)=>{
                return(
                    <tr>
                    <th scope="row">{value.id}</th>
                    <td>{value.name}</td>
                    <td>{value.username}</td>
                    <td>{value.email}</td>
                  </tr>
                )
            })}
    
        </tbody>
      </table>
     
    </div>
  );
}
export default Emp;
