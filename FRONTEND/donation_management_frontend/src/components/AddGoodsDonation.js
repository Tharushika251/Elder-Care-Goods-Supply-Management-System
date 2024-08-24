import React, { useState } from "react";
import axios from "axios";

export default function AddGoodsDonation() {
    const [donorId, setDonorId] = useState("");
    const [donateDate, setDonateDate] = useState("");
    const [note, setNote] = useState("");
    const [donateGoods, setDonateGoods] = useState("");

    function sendData(e) {
        e.preventDefault();
    
        const newGoodsDonation = {
            donorId,
            donateDate,
            note,
            donateGoods
        }
    
        axios.post("http://localhost:8070/goodsDonations/addGoodsDonation", newGoodsDonation)
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
        setDonateGoods("");
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

                    <div className="mb-3">
                        <label htmlFor="donateGoods" className="form-label">Goods to be donated</label>
                        <textarea className="form-control" id="donateGoods" value={donateGoods} onChange={(e) => {

                            setDonateGoods(e.target.value);

                        }} required />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="note" className="form-label" style={{ color: "white" }}>Note</label>
                    <textarea className="form-control" id="note" value={note} onChange={(e) => {

                        setNote(e.target.value);

                    }} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" style={{ float: "right" }}>Submit</button>
                    <button type="button" className="btn btn-secondary me-2" onClick={handleReset} style={{ float: "right" }}>Reset</button>
                </div>
            </form>
        </div>
    );
}
