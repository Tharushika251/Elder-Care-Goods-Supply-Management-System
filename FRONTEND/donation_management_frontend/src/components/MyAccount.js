import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyAccount({ firstName, lastName }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const response = await axios.get(`http://localhost:8070/donor/find/${firstName}/${lastName}`);
                const userId = response.data._id;
                fetchUserDetails(userId);
            } catch (error) {
                alert(error.message);
            }
        }

        async function fetchUserDetails(userId) {
            try {
                const response = await axios.get(`http://localhost:8070/donor/get/${userId}`);
                setUser(response.data);
            } catch (error) {
                alert(error.message);
            }
        }

        fetchUserId();
    }, [firstName, lastName]);

    return (
        <div>
            {user && (
                <div>
                    <h2>User Details</h2>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                    <p>NIC: {user.nic}</p>
                    <p>Address: {user.address}</p>
                    {/* Display other user details as needed */}
                </div>
            )}
        </div>
    );
}
