import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddCashDonation() {
    const [donorId, setDonorId] = useState("");
    const [donateDate, setDonateDate] = useState("");
    const [note, setNote] = useState("");
    const [donateAmount, setDonateAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [donationSlips, setDonationSlips] = useState([]);

    const handleRemoveSlip = (index) => {
        const updatedSlips = [...donationSlips];
        updatedSlips.splice(index, 1);
        setDonationSlips(updatedSlips);
    };

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("donorId", donorId);
        formData.append("donateDate", donateDate);
        formData.append("note", note);
        formData.append("donateAmount", donateAmount);
        formData.append("paymentMethod", paymentMethod);

        const slips = Array.from(donationSlips);

        slips.forEach((slip, index) => {
            formData.append("donationSlips", slip);
        });

        axios.post("http://localhost:8070/cashDonation/addCashDonations", formData)
            .then(() => {
                alert("Thank you for your Donation...!");
            })
            .catch((err) => {
                alert("An error occurred while adding the donation. Please try again later.");
            });
    }

    function handleReset() {
        setDonorId("");
        setDonateDate("");
        setNote("");
        setDonateAmount("")
        setPaymentMethod("")
        setDonationSlips("")
    }

    return (
        <div className="container p-5 my-5 border bg-dark">
            <div className="center">
                <h1 style={{ color: "white" }}><b><u>Add Donation</u></b></h1>
            </div>
            <form onSubmit={sendData}>

                <div className="mb-3">
                    <label htmlFor="donorId" className="form-label" style={{ color: "white", marginTop: "5px" }}>Donor ID</label>
                    <div className="form-group">
                        <input type="text" className="form-control" id="donorId" value={donorId} required onChange={(e) => {

                            setDonorId(e.target.value);

                        }} />
                    </div>
                </div>
                <div className="container bg-light p-4" id="goods">
                    <div className="mb-3">
                        <label htmlFor="donateDate" className="form-label" style={{ marginTop: "5px" }}>Donation Date</label>
                        <input type="date" className="form-control" id="donateDate" value={donateDate} onChange={(e) => {

                            setDonateDate(e.target.value);

                        }} required />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6 mt-3">
                            <label htmlFor="donateAmount" className="form-label" style={{ marginTop: "5px" }}>Donate Amount</label>
                        </div>
                        <div className="col-md-6 mt-3">
                            <input type="number" className="form-control" id="donateAmount" value={donateAmount} onChange={(e) => {

                                setDonateAmount(e.target.value);

                            }} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input className="form-check-input" type="radio" id="online" name="paymentMethod" value="online" checked={paymentMethod === "online"} onChange={(e) => {

                            setPaymentMethod(e.target.value);

                        }} required />
                        <label className="form-check-label mb-1" htmlFor="online" style={{ marginLeft: "10px" }}>
                            Online Donation
                        </label>
                    </div>
                    <div className="mb-3">
                        <input className="form-check-input" type="radio" id="offline" name="paymentMethod" value="offline" checked={paymentMethod === "offline"} onChange={(e) => {

                            setPaymentMethod(e.target.value);

                        }} required />
                        <label className="form-check-label mb-1" htmlFor="offline" style={{ marginLeft: "10px" }}>
                            Offline Donation
                        </label>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-md-6 mt-3">
                            <label htmlFor="donationSlip" className="form-label">Attach Donation Slip</label>
                        </div>
                        <div className="col-md-6 mt-3 d-flex align-items-center">
                            <label htmlFor="donationSlip" className="form-label btn btn-secondary" style={{ cursor: "pointer" }}>
                                Choose File <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
                                <input type="file" className="form-control" id="donationSlip" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => {

                                    setDonationSlips(e.target.files);

                                }} style={{ display: "none" }} multiple />
                            </label>
                            {donationSlips.length === 0 && (
                                <div className="col mb-2">
                                    <span className="form-label" style={{ marginLeft: "5px", color: "white" }}>No file chosen</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {donationSlips.length > 0 && (
                        <>
                            {Array.from(donationSlips).map((slip, index) => (
                                <div className="mb-2 row" key={index}>
                                    <div className="col-md-6">
                                        <span className="form-label">Donation Slip {index + 1}</span>
                                    </div>
                                    <div className="col-md-5">
                                        <span>{slip.name}</span>
                                    </div>
                                    <div className="col-md-1">
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveSlip(index)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    <div className="mb-3 d-flex justify-content-end">
                        <button className="btn btn-success mb-2" disabled={paymentMethod === "offline"} onClick={() => window.location.href = "https://www.paypal.com/"}>Pay Now</button>
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary" style={{ float: "right" }}>Submit</button>
                    <button type="button" className="btn btn-secondary me-2" onClick={handleReset} style={{ float: "right" }}>Reset</button>
                </div>
            </form>
        </div>
    );
}
