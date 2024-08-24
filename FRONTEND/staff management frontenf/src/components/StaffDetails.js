import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StaffDetails = () => {
    const [staff, setStaff] = useState({
        
    });
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8070/staff/get/${id}`)
            .then(result => {
                console.log("Result:", result.data); // Check what data you're receiving
                if (result.data.status === "User fetched") {
                    setStaff(result.data.staff); // Set staff details in state
                }
            })
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (Object.keys(staff).length === 0 && staff.constructor === Object) {
        return <div>Loading...</div>;
    }

    // Render staff details if available
    return (
        <div>
            <h1>Staff Details</h1>
            <p>Name: {staff.name}</p>
            <p>Email: {staff.email}</p>
            <p>Position: {staff.position}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default StaffDetails