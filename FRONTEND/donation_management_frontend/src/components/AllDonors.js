import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllDonors() {
    const [donors, setDonors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //const [monthlyReport, setMonthlyReport] = useState([]);

    useEffect(() => {
        async function fetchDonors() {
            try {
                const response = await axios.get("http://localhost:8070/donor");
                setDonors(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchDonors();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const deleteDonor = async (id) => {
        if (window.confirm("Are you sure you want to delete this donor?")) {
            try {
                await axios.delete(`http://localhost:8070/donor/delete/${id}`);
                setDonors(donors.filter((donor) => donor._id !== id));
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const filteredDonors = donors.filter((donor) => {
        return (
            donor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Donor Details</h3>
            </div>
            <div style={{ float: "right" }}>
                <Link to="/add" className="btn btn-primary mb-3">+ Add Donor</Link>
            </div>
            <div className="container">
                <div className="row mt-2 mb-3 me-1" style={{ float: "right" }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        onChange={handleSearch}
                    />
                </div>
                <table className="container table mt-5">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonors.map((d) => (
                            <tr key={d._id}>
                                <td>{d.firstName} {d.lastName}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`/donorProfile/${d._id}`} className="btn btn-primary btn-sm me-2">View</Link> 
                                        <Link to={`/updateDonor/${d._id}`} className="btn btn-primary btn-sm me-2">Edit</Link> 
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteDonor(d._id)}>Delete</button>
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