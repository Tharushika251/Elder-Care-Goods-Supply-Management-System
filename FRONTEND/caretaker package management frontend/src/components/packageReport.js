import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import logoImage from './logo.jpg';


const PackageReport = ({ location }) => {
    const [newpackagesData, setNewpackagesData] = useState([]);
    const ComponentsRef = useRef();

    useEffect(() => {
        getNewpackages();
    }, []);

    const getNewpackages = async () => {
        try {
            const response = await axios.get("http://localhost:8072/newpackage/");
            setNewpackagesData(response.data);
        } catch (error) {
            alert("An error occurred while fetching new packages.");
            console.error("Fetch Error:", error);
        }
    };

    const handlePrint1 = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: 'New Packages Report',
        onAfterPrint: () => alert('New Packages Report Successfully Downloaded!')
    });
    const styles = {
        line: {
            backgroundColor:'blue',
            width: '100%',
            height:'5px',
            border: '1px solid #ccc',
            margin: '20px 0',
        },
    };
    useEffect(() => {
        const currentDate = new Date();
        const submittedDate = currentDate.toISOString().slice(0, 10);
        const submittedDateElement = document.getElementById('submitted-date');
        if (submittedDateElement) {
            submittedDateElement.textContent = `Submitted Date: ${submittedDate}`;
        }
    }, []);

    return (
        <div className="package-report-container">
           
            <div style={styles.container} ref={ComponentsRef}><center>
            <br/>
        <br/>
            <img src={logoImage} alt="Logo" className="logo" />
            <h1 style={{ color: '#194486' }}>Forever Caring Corner</h1>
            <h7>Contact Number: XXX-XXX-XXXX</h7>
            <p><h8>Website: www.Website.com</h8></p>
            <hr style={styles.line} /></center>
            <center>
                <h2>Standard Package Report</h2></center>
                <b><p id="submitted-date"></p></b><br/>
                <table>
                    <thead>
                        <tr>
                            <th>Name of Standard Package</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newpackagesData.map((newpackage) => (
                            <tr key={newpackage._id}>
                                <td>{newpackage.nPname}</td>
                                <td>{newpackage.nPdescription}</td>
                                <td>{newpackage.nPprice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                <br/><br/><br/>

                <h9 style={{ position: 'absolute', right: '10px', whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
  _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _<br />
  <b>Package Manager</b>
</h9>
            </div><center>
            <button className="print-button" onClick={handlePrint1} style={{ backgroundColor: '#194486', color: 'white' }}>Download Report</button></center>
        </div>
    );
};

export default PackageReport;
