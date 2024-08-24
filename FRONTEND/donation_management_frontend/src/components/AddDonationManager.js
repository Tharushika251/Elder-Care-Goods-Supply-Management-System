import React, { useState } from "react";
import axios from "axios";

export default function AddDonationManager() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newDonationManager = {
            firstName,
            lastName,
            email,
            phoneNumber,
            nic,
            address
        }

        axios.post("http://localhost:8070/donationManager/addManager", newDonationManager)
        .then(() => {
            alert("Welcome Donation Manager...!");
        })
        .catch((err) => {
            if (err.response && err.response.data) {
                const validationErrors = err.response.data.errors;
                let errorMessage = '';

                // Check for validation errors in email, phone number, or NIC
                if (validationErrors.email) {
                    errorMessage += `${validationErrors.email.message}\n`;
                }
                if (validationErrors.phoneNumber) {
                    errorMessage += `${validationErrors.phoneNumber.message}\n`;
                }
                if (validationErrors.nic) {
                    errorMessage += `${validationErrors.nic.message}\n`;
                }

                // Display error message if validation errors occurred
                if (errorMessage) {
                    alert(errorMessage);
                } else {
                    alert("An error occurred while adding the donation manager. Please try again later.");
                }
            } else {
                alert("An error occurred while adding the donation manager. Please try again later.");
            }
        });

    }

    function handleReset() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setNic("");
        setAddress("");
    }

    return (

        <div className="container p-5 my-5 border bg-dark" >
            <div>
                <h1 style={{ color: "white", }}><b><u>Register as a Donation Manager</u></b></h1>
            </div>
            <form onSubmit={sendData}>
                <div className="row">
                    <div className="col">
                        <label for="firstName" className="form-label" style={{ color: "white", marginTop: "15px" }}> First Name</label>
                        <input type="text" className="form-control" placeholder=" First Name" name="firstName" onChange={(e) => {

                            setFirstName(e.target.value);

                        }}></input>
                    </div>
                    <div className="col">
                        <label for="lastName" className="form-label" style={{ color: "white", marginTop: "15px" }}> Last Name</label>
                        <input type="text" className="form-control" placeholder=" Last Name" name="lastName" onChange={(e) => {

                            setLastName(e.target.value);

                        }}></input>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label" style={{ color: "white", marginTop: "5px" }}> Email Address</label>
                    <input type="text" className="form-control" id="email" placeholder=" Email (eg: tharu8076@gmail.com)" onChange={(e) => {

                        setEmail(e.target.value);

                    }}></input>
                </div>
                <div className="mb-3">
                    <label for="phoneNumber" className="form-label" style={{ color: "white", marginTop: "5px" }}> Phone Number</label>
                    <input type="text" className="form-control" id="phoneNumber" placeholder=" Phone Number (+94 123456789)" onChange={(e) => {

                        setPhoneNumber(e.target.value);

                    }}></input>
                </div>
                <div className="mb-3">
                    <label for="nic" className="form-label" style={{ color: "white", marginTop: "5px" }}> NIC</label>
                    <input type="text" className="form-control" id="nic" placeholder=" NIC (eg:xxxxxxxxxxxx or xxxxxxxxxv)" onChange={(e) => {

                        setNic(e.target.value);

                    }}></input>
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label" style={{ color: "white", marginTop: "5px" }}>Address</label>
                    <input type="text" className="form-control" id="address" placeholder=" Address" onChange={(e) => {

                        setAddress(e.target.value);

                    }}></input>
                </div>
                
                <div className="col">
                    <button type="submit" class="btn btn-primary" style={{ float: "right", marginTop: "5px" }}>Submit</button>
                    <button type="reset" class="btn btn-secondary me-2" style={{ float: "right", marginTop: "5px" }} onClick={handleReset}>Reset</button>
                </div>

            </form>
        </div>

    )

}