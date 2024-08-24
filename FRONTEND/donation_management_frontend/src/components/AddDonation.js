import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddDonation() {

    return (
        <div>
            <div>
                <h1 class="center">Donate Us</h1>
            </div>
            <div style={{ float: "right" }}>
                <Link to="/goodsDonation" className="btn btn-primary">+ Add Goods Donation</Link>
            </div>
            <div style={{ float: "right" }}>
                <Link to="/cashDonation" className="btn btn-primary">+ Add Cash Donation</Link>
            </div>
        </div>
    )
}
