import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Donation.css";

export default function DonationManagerDashboard() {

    return (
        <div class="main">
            <div class="form">
                    <div>
                        <Link to="/donationDistribution" className="btn btn-primary mb-3">Donation Distribution</Link>
                    </div>
                    <div>
                        <Link to="/allDonationManagers" className="btn btn-primary mb-3">Donation Managers</Link>
                    </div>
                </div>
        </div>
    );
}