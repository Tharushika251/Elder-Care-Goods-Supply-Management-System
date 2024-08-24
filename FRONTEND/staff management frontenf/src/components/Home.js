import React, { useEffect, useState } from 'react';
import axios from "axios";

function Home() {
  const [adminTotal, setAdminTotal] = useState();
  const [staffTotal, setStaffTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admins, setAdmins] = useState([]);
  
  useEffect(() => {
    adminCount();
    staffCount();
    adminRecords();
    salaryCount();
  }, []);

  const adminRecords = () => {
    axios.get("http://localhost:8070/admin/admin_records")
      .then(result => {
        if (result.data.status) {
          setAdmins(result.data.result);
        }
      });
  };

  const adminCount = () => {
    axios.get("http://localhost:8070/admin/admin_count")
      .then(result => {
        if (result.data.status) {
          setAdminTotal(result.data.result.admin);
        }
      });
  };

  const staffCount = () => {
    axios.get("http://localhost:8070/staff/staff_count")
      .then(result => {
        if (result.data.status) {
          setStaffTotal(result.data.result.staff);
        }
      });
  };

  const salaryCount = () => {
    axios.get("http://localhost:8070/salary/salary_count")
      .then(result => {
        if (result.data.status) {
          setSalaryTotal(result.data.result.salaryTotal);
        }
      });
  };

  return (
    <div className='p-3 mt-3'>
      <div className="row">
        <div className="col-md-4">
          <div className='px-3 pt-2 pb-2 border shadow-sm mb-4'>
            <div className='text-center pb-1'>
              <h4>Admin</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{adminTotal}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='px-3 pt-2 pb-2 border shadow-sm mb-4'>
            <div className='text-center pb-1'>
              <h4>Staff Member</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{staffTotal}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className='px-3 pt-2 pb-2 border shadow-sm mb-4'>
            <div className='text-center pb-1'>
              <h4>Salary</h4>
            </div>
            <hr />
            <div>
              <h5>Total:</h5>
              <h5>${salaryTotal}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table '>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id}>
                <td>{a.email}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;