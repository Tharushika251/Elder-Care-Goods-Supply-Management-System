import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import './style.css'

export default function AllStaff() {
    const [staff, setStaff] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        function getStaffs() {
            axios.get("http://localhost:8070/staff/all").then((res) => {
                setStaff(res.data)
            }).catch((err) => {
                alert(err.message)
            })
        }
        getStaffs();
    }, [])

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
        axios.delete(`http://localhost:8070/staff/delete/${id}`)
        .then(result => {
            if(result.data.status){
                alert("Staff Member Deleted");
                window.location.reload()
            }else{
                alert(result.data.error)
            }
        })
    }

    const filteredStaff = staff.filter((s) => {
        return (
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            
        );
    });

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Staff List</h3>
            </div>
            <div className="input-group  mb-3 " style={{ maxWidth: "200px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            <button className="btn btn-outline-secondary btn-sm"
                    type="button"
                    id="button-addon2"
                    style={{ fontSize: "0.8rem" }}>Search</button>
            </div>
            <Link to="/dashboard/add" className="btn btn-success">
                Add Staff Member
            </Link>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>NIC</th>
                            <th>Gender</th>
                            <th>Job Role</th>
                            <th>Telephone No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.map((s) => (
                            <tr key={s._id}>
                                <td>{s._id}</td>
                                <td>{s.name}</td>
                                <td>
                                    <img key={s._id}
                                        src={`http://localhost:8070/Images/${s.photo}`}
                                        className="staff_photo"
                                        
                                    />
                                </td>
                                <td>{s.email}</td>
                                <td>{s.address}</td>
                                <td>{s.NIC}</td>
                                <td>{s.gender}</td>
                                <td>{s.type}</td>
                                <td>{s.contactno}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link
                                            to={`/dashboard/update/${s._id}`}
                                            className="btn btn-primary btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(s._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
