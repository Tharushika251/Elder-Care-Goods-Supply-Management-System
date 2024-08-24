import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import logoImage from './logo.jpg';


const UsersReport = ({ location }) => {
    const [caretakersData, setCaretakersData] = useState([]);
    const ComponentsRef = useRef();

    useEffect(() => {
        getCaretakers();
    }, []);

    const getCaretakers = async () => {
        try {
            const response = await axios.get("http://localhost:8072/caretaker/");
            setCaretakersData(response.data);
        } catch (error) {
            alert("An error occurred while fetching caretakers.");
            console.error("Fetch Error:", error);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: 'Users Report',
        onAfterPrint: () => alert('Users Report Successfully Downloaded!')
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

            <h2>Caretaker Report</h2>            
            </center>
            <b><p id="submitted-date"></p></b><br/>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact Number</th>
                        <th>Work Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {caretakersData.map((caretaker) => (
                        <tr key={caretaker._id}>
                            <td>{caretaker.name}</td>
                            <td>{caretaker.age}</td>
                            <td>{caretaker.gender}</td>
                            <td>{caretaker.contactNumber}</td>
                            <td>{caretaker.workfee}</td>
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
            <button className="print-button" onClick={handlePrint} style={{ backgroundColor: '#194486', color: 'white' }}>Download Report</button></center>
        </div>
    );
};

export default UsersReport;
