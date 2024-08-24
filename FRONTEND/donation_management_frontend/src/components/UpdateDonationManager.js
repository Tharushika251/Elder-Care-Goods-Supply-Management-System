import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateDonationManager() {
    const [donationManagerId, setDonationManagerId] = useState(""); // State to store the donor's _id
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [existingDetails, setExistingDetails] = useState({});

    useEffect(() => {
        async function fetchDonationManagerDetails() {
            try {
                const response = await axios.get(`http://localhost:8070/donationManager/get/${donationManagerId}`);
                setExistingDetails(response.data);
            } catch (error) {
                alert(error.message);
            }
        }

        if (donationManagerId) {
            fetchDonationManagerDetails();
        }
    }, [donationManagerId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                _id: donationManagerId, // Include the donationManager's _id in the updated data
                firstName: firstName || existingDetails.firstName,
                lastName: lastName || existingDetails.lastName,
                email: email || existingDetails.email,
                phoneNumber: phoneNumber || existingDetails.phoneNumber,
                nic: nic || existingDetails.nic,
                address: address || existingDetails.address,
            };
            const response = await axios.put(`http://localhost:8070/donationManager/update/${donationManagerId}`, updatedData); // Pass donationManagerId as part of the URL
            if (response.status === 200) {
                alert("User Updated Successfully");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleReset = () => {
        setDonationManagerId(""); // Reset donationManagerId state
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setNic("");
        setAddress("");
    };

    return (
        <div className="container p-5 my-5 border bg-dark" style={{ maxWidth: "700px" }}>
            <div className="center">
                <h1 style={{ color: "white" }}><b><u>Update Account</u></b></h1>
            </div>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label" style={{ color: "white", marginTop: "5px" }}> User ID</label>
                    <input type="text" className="form-control" id="userId" placeholder=" User ID" value={donationManagerId} onChange={(e) => setDonationManagerId(e.target.value)} required></input>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label" style={{ color: "white", marginTop: "15px" }}> First Name</label>
                        <input type="text" className="form-control" placeholder=" First Name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label" style={{ color: "white", marginTop: "15px" }}> Last Name</label>
                        <input type="text" className="form-control" placeholder=" Last Name" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: "white", marginTop: "5px" }}> Email Address</label>
                    <input type="text" className="form-control" id="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label" style={{ color: "white", marginTop: "5px" }}> Phone Number</label>
                    <input type="text" className="form-control" id="phoneNumber" placeholder=" Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="nic" className="form-label" style={{ color: "white", marginTop: "5px" }}> NIC</label>
                    <input type="text" className="form-control" id="nic" placeholder=" NIC" value={nic} onChange={(e) => setNic(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label" style={{ color: "white", marginTop: "5px" }}>Address</label>
                    <input type="text" className="form-control" id="address" placeholder=" Address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary" style={{ float: "right", marginTop: "5px" }}>Update</button>
                    <button type="reset" className="btn btn-secondary me-3" style={{ float: "right", marginTop: "5px" }} onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
}