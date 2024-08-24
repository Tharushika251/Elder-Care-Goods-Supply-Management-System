import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllDonations() {
    const [donations, setDonations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchDonations() {
            try {
                const response = await axios.get("http://localhost:8070/donation");
                setDonations(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchDonations();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const deleteDonations = async (id) => {
        if (window.confirm("Are you sure you want to delete this donation?")) {
            try {
                await axios.delete(`http://localhost:8070/donation/delete/${id}`);
                setDonations(donations.filter((donation) => donation._id !== id));
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const filteredDonations = donations.filter((donation) => {
        return (
            donation.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Donation Details</h3>
            </div>
            <div style={{ float: "right" }}>
                <Link to="/add" className="btn btn-primary mb-3">+ Add Donation</Link>
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
                            <th className="center">Donation ID</th>
                            <th className="center">Donor Name</th>
                            <th className="center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonations.map((d) => (
                            <tr key={d._id}>
                                <td>{d._id}</td>
                                <td>{d.donorId}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`/donationProfile/${d._id}`} className="btn btn-primary btn-sm me-2">View</Link> {/* Link to DonorProfile.js with donor's _id */}
                                        <Link to={`/updateDonation/${d._id}`} className="btn btn-primary btn-sm me-2">Edit</Link> {/* Link to UpdateDonor.js with donor's _id */}
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteDonations(d._id)}>Delete</button>
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



/*import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddDonation() {
    const [donorId, setDonorId] = useState("");
    const [donationType, setDonationType] = useState("");
    const [donateDate, setDonateDate] = useState("");
    const [deliverType, setDeliverType] = useState(false);
    const [note, setNote] = useState("");
    const [donateAmount, setDonateAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [donationSlips, setDonationSlips] = useState([]);
    const [donateGoods, setDonateGoods] = useState("");

    const handleRemoveSlip = (index) => {
        const updatedSlips = [...donationSlips];
        updatedSlips.splice(index, 1);
        setDonationSlips(updatedSlips);
    };

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("donorId", donorId);
        formData.append("donationType", donationType);
        formData.append("donateDate", donateDate);
        formData.append("deliverType", deliverType);
        formData.append("note", note);
        formData.append("donateAmount", donateAmount);
        formData.append("paymentMethod", paymentMethod);
        formData.append("donateGoods", donateGoods);

        // Convert donationSlips to an array
        const slips = Array.from(donationSlips);

        slips.forEach((slip, index) => {
            formData.append("donationSlips", slip);
        });

        axios.post("http://localhost:8070/donation/addDonation", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                alert("New Donation added. Thank you...!");
            })
            .catch((err) => {
                alert(err);
            });
    }

    function handleReset() {
        setDonorId("");
        setDonationType("");
        setDonateDate("");
        setDeliverType(false);
        setNote("");
        setDonateAmount("");
        setPaymentMethod("");
        setDonationSlips([]);
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
                <div className="mb-3">
                    <label htmlFor="donationType" className="form-label" style={{ color: "white", marginTop: "5px" }}>Donation Type</label>
                    <div className="form-group">
                        <select className="form-control" id="donationType" value={donationType} onChange={(e) => {

                            setDonationType(e.target.value);

                        }} required>
                            <option value="">Select donation type...</option>
                            <option value="cash">Cash Donation</option>
                            <option value="goods">Goods Donation</option>
                        </select>
                    </div>
                </div>
                {donationType === "goods" && (
                    <div className="container bg-light p-4" id="goods">
                        <div className="mb-3">
                            <label htmlFor="donateDate" className="form-label" style={{ marginTop: "5px" }}>Donation Date</label>
                            <input type="date" className="form-control" id="donateDate" value={donateDate} onChange={(e) => {

                                setDonateDate(e.target.value);

                            }} required />
                        </div>
                        <div>
                            <input className="form-check-input" type="checkbox" id="deliveryType" checked={deliverType} onChange={(e) => {

                                setDeliverType(e.target.checked);

                            }} />
                            <label className="form-check-label" htmlFor="deliveryType" style={{ marginLeft: "10px" }}>
                                Online Delivery
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="donateGoods" className="form-label">Goods to be donated</label>
                            <textarea className="form-control" id="donateGoods" value={donateGoods} onChange={(e) => {

                                setDonateGoods(e.target.value);

                            }} required />
                        </div>
                    </div>
                )}
                {donationType === "cash" && (
                    <div className="container bg-light p-4" id="cash">
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
                                        <span className="form-label" style={{ marginLeft: "5px" }}>No file chosen</span>
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
                )}
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
*/
