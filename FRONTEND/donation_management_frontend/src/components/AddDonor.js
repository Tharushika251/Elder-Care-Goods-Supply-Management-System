import React, { useState } from "react";
import axios from "axios";

export default function AddDonor() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newDonor = {
            firstName,
            lastName,
            email,
            phoneNumber,
            nic,
            address
        }

        axios.post("http://localhost:8070/donor/add", newDonor)
        .then(() => {
            alert("Welcome Donor...!");
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
                    alert("An error occurred while adding the donor. Please try again later.");
                }
            } else {
                alert("An error occurred while adding the donor. Please try again later.");
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
                <h1 style={{ color: "white", }}><b><u>Register as a Donor</u></b></h1>
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
                <div className="form-group form-check">
                    <div>
                        <input type="checkbox" className="form-check-input" id="agreeCheckbox" required></input>
                        <label className="form-check-label" for="checkbox" style={{ color: "white" }}>I Agree to Terms and Conditions</label>
                    </div>
                    <label className="terms">
                        <a href="#termsCollapse" data-toggle="collapse" aria-expanded="false" aria-controls="termsCollapse">Terms and Conditions</a>
                    </label>
                </div>

                <div className="collapse" id="termsCollapse">
                    <div className="card card-body">
                        <p>
                            Eligibility: Donors must be of legal age and have the legal capacity to make donations according to the laws of their jurisdiction.
                            Accuracy of Information: Donors are responsible for providing accurate and truthful information when making donations, including personal information and details about donated items.
                            Donation Process: Donors understand that all donations made through the web application are voluntary and non-refundable. Once a donation is made, it cannot be reversed or refunded.
                            Use of Donations: Donors acknowledge that the organization running the elder care donation management system will use donated funds or items to support their mission and objectives, which may include providing goods and services to elderly individuals in need.
                            Tax Deductibility: Donors understand that donations made to eligible charitable organizations may be tax-deductible, and it is their responsibility to consult with a tax advisor regarding the deductibility of their donations.
                            Privacy: Donors' personal information will be handled in accordance with the organization's privacy policy. This may include the collection, storage, and use of personal information for donation processing, communication, and reporting purposes.
                            Acknowledgment: Donors may receive acknowledgment or receipt of their donations for tax or record-keeping purposes. However, the organization reserves the right to determine the format and timing of such acknowledgments.
                            Communication: By providing their contact information, donors consent to receive communication from the organization regarding their donations, as well as updates, newsletters, and other relevant information related to the organization's activities and initiatives.
                            Code of Conduct: Donors agree to adhere to the organization's code of conduct and ethical guidelines when interacting with the web application and its representatives. This includes refraining from engaging in any illegal, unethical, or abusive behavior.
                            Modification of Terms: The organization reserves the right to modify or update these terms and conditions at any time without prior notice. Donors are encouraged to review the terms periodically for any changes.
                            Governing Law: These terms and conditions are governed by the laws of the jurisdiction where the organization is based, and any disputes arising from or relating to these terms shall be resolved in accordance with those laws.
                            Acceptance: By making a donation through the web application, donors acknowledge that they have read, understood, and agree to abide by these terms and conditions.
                        </p>
                    </div>
                </div>

                <div className="col">
                    <button type="submit" class="btn btn-primary" style={{ float: "right", marginTop: "5px" }}>Submit</button>
                    <button type="reset" class="btn btn-secondary me-2" style={{ float: "right", marginTop: "5px" }} onClick={handleReset}>Reset</button>
                </div>

            </form>
        </div>

    )

}