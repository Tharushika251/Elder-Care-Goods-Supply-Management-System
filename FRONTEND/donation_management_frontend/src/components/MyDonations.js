import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyDonations() {

    return (
        <div>
            <div>
                <h1 class="center">My Donations</h1>
            </div>
            <div style={{ float: "right" }}>
                <Link to="/addDonation" className="btn btn-primary">+ Add Donation</Link>
            </div>
        </div>
    )
}
