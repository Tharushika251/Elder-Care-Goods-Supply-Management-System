import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllDonationManagers() {
    const [donationManagers, setDonationManagers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchDonationManagers() {
            try {
                const response = await axios.get("http://localhost:8070/donationManager");
                setDonationManagers(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchDonationManagers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const deleteDonationManager = async (id) => {
        if (window.confirm("Are you sure you want to delete this donationManager?")) {
            try {
                await axios.delete(`http://localhost:8070/donationManager/delete/${id}`);
                setDonationManagers(donationManagers.filter((donationManager) => donationManager._id !== id));
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const filteredDonationManagers = donationManagers.filter((donationManager) => {
        return (
            donationManager.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donationManager.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donationManager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donationManager.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donationManager.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donationManager.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Donation Manager Details</h3>
            </div>
            <div style={{ float: "right" }}>
                <Link to="/addManager" className="btn btn-primary mb-3">+ Add Donation Manager</Link>
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
                        {filteredDonationManagers.map((d) => (
                            <tr key={d._id}>
                                <td>{d.firstName} {d.lastName}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`/donationManagerProfile/${d._id}`} className="btn btn-primary btn-sm me-2">View</Link> 
                                        <Link to={`/updateDonationManager/${d._id}`} className="btn btn-primary btn-sm me-2">Edit</Link> 
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteDonationManager(d._id)}>Delete</button>
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