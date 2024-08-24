import axios from "axios"
import React, { useState, useEffect,useRef } from "react"
import { Link } from 'react-router-dom';
import {useReactToPrint} from "react-to-print";
import './style.css'

export default function Salary() {

  const [salary, setSalary] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle:"Staff Members Salary Report",
    onafterprint:()=>alert("Salary Report Successfully Download!")
  })
 
  

  useEffect(() => {
      function getSalary() {
          axios.get("http://localhost:8070/salary/allsal").then((res) => {
            setSalary(res.data)
          }).catch((err) => {
              alert(err.message)
          })
      }
      getSalary();
  }, [])

  const filteredSalary = salary.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      
    );
  });

  

  return (
      <div className="px-5 mt-3">
          <div className="d-flex justify-content-center">
              <h3>Salary Details List</h3>
          </div>
          <div className="input-group  mb-3 " style={{ maxWidth: "200px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary btn-sm"
                    type="button"
                    id="button-addon2"
                    style={{ fontSize: "0.8rem" }}>Search</button>
      </div>
          <Link to="/dashboard/addsal" className="btn btn-success">
              Add Salary Details
          </Link>
          <div className="mt-3" ref={ComponentsRef}>
              <table className="table">
                  <thead>
                      <tr >
                          <th>ID</th>
                          <th> Name</th>
                          <th> Date</th>
                          <th> Basic Salary</th>
                          <th> OT Hours</th>
                          <th> OT Rate</th>
                          <th>Bonus</th>
                          <th>Total Salary</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      {
                          filteredSalary.map((s) => (
                              <tr >
                                  <td>{s.id}</td>
                                  <td>{s.name}</td>
                                  <td>{s.date}</td>
                                  <td>{s.basic}</td>
                                  <td>{s.othrs}</td>
                                  <td>{s.otrate}</td>
                                  <td>{s.bonus}</td>
                                  <td>{s.totalSalary}</td>
                                  
                                  
                              </tr>
                          ))
                      }
                  </tbody>

              </table>

          </div>
          <button onClick={handlePrint} className="btn btn-primary">Download Report</button>

      </div>
  )

}