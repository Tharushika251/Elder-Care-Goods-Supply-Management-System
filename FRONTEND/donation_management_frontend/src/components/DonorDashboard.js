import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Donation.css";

export default function DonorDashboard() {

    return (
        <div class="main">
            <div class="form">
                    <div>
                        <Link to="/addGoodsDonation" className="btn btn-primary mb-3">+ Add Goods Donation</Link>
                    </div>
                    <div>
                        <Link to="/addCashDonation" className="btn btn-primary mb-3">+ Add Cash Donation</Link>
                    </div>
                </div>
        </div>
    );
}
