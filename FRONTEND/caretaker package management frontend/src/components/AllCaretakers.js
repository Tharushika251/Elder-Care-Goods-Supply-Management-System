import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import elderImage from './eldercaret.png';
import './AllCaretakers.css';
//import 'bootstrap/dist/css/bootstrap.min.css';


export default function AllCaretakers() {
    const [caretakers, setCaretakers] = useState([]);
    //const navigate1 = useNavigate();
    const [searchKey, setSearchKey] = useState('');
    //const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getCaretakers();
    }, []);

    const getCaretakers = async () => {
        try {
            const response = await axios.get("http://localhost:8072/caretaker/");
            setCaretakers(response.data);
        } catch (error) {
            alert("An error occurred while fetching caretakers.");
            console.error("Fetch Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            // Optimistically update UI assuming deletion will be successful
            setCaretakers(prevCaretakers =>
                prevCaretakers.filter(caretaker => caretaker._id !== id)
            );
            // Trigger the delete operation
            await axios.delete(`http://localhost:8072/caretaker/delete/${id}`);
            alert("Caretaker deleted successfully.");
            // Optionally fetch updated data after deletion
            getCaretakers();
        } catch (error) {
            alert("An error occurred while deleting the caretaker.");
            console.error("Delete Error:", error);
            // Roll back UI changes if deletion fails
            getCaretakers();
        }
    };
    const [newpackages, setNewpackage] = useState([]);
    //const navigate = useNavigate();

    useEffect(() => {
        getNewpackage();
    }, []);

    const getNewpackage = async () => {
        try {
            const response = await axios.get("http://localhost:8072/newpackage/");
            setNewpackage(response.data);
        } catch (error) {
            alert("An error occurred while fetching New package.");
            console.error("Fetch Error:", error);
        }
    };

    const handleDelete2 = async (id) => {
        try {
            // Optimistically update UI assuming deletion will be successful
            setNewpackage(prevNewpackage =>
                prevNewpackage.filter(newpackage => newpackage._id !== id)
            );
            // Trigger the delete operation
            await axios.delete(`http://localhost:8072/newpackage/delete1/${id}`);
            alert("Newpackage deleted successfully.");
            // Optionally fetch updated data after deletion
            getNewpackage();
        } catch (error) {
            alert("An error occurred while deleting the newpackage.");
            console.error("Delete Error:", error);
            // Roll back UI changes if deletion fails
            getNewpackage();
        }
    };
    

    
    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent form submission
        try {
            const response = await axios.get(`http://localhost:8072/caretaker/search/${searchKey}`);
            setCaretakers(response.data);
        } catch (error) {
            alert("An error occurred while searching.");
            /*console.error("Search Error:", error);*/
        }
    };

    const handleSearch2 = async (event) => {
        event.preventDefault(); // Prevent form submission
        try {
            const response = await axios.get(`http://localhost:8072/newpackage/search/${searchKey}`);
            setNewpackage(response.data);
        } catch (error) {
            alert("An error occurred while searching.");
            /*console.error("Search Error:", error);*/
        }
    };
    


    return (

        <div className='container'>
            
            <img src={elderImage} className="img-fluid" alt="Responsive image" style={{ height: '300px' }}/>
            
            <center>
            <h1>All Caretakers</h1></center>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
                <button className="btn btn-primary btn-sm btn-success" type="submit" style={{ backgroundColor: '#194486', color: 'white' }}>Search</button>
            </form>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Work Fee</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                        caretakers.map((caretaker, index) => (
                            <tr key={caretaker._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{caretaker.name}</td>
                            <td>{caretaker.age}</td>
                            <td>{caretaker.gender}</td>
                            <td>{caretaker.contactNumber}</td>
                            <td>{caretaker.workfee}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm btn-success" style={{ backgroundColor: '#194486', color: 'white' }} to={`/update/${caretaker._id}`}>Edit</Link>
                                <button onClick={() => handleDelete(caretaker._id)}>Delete</button>
                                

                            </td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
            <Link
    className="btn btn-primary btn-sm btn-success" style={{ backgroundColor: '#194486', color: 'white' }}
    to={{
        pathname: `/UserReport`,
        state: { caretakersData: caretakers } // Pass caretakers data as state
    }}
>
    Download Report
</Link>
            
            
            <center><h1>All Standerd Packages</h1></center>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch2}>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-primary btn-sm btn-success" type="submit" style={{ backgroundColor: '#194486', color: 'white' }}>Search</button>
                
            </form>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Name of Standard Package</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {newpackages.map((newpackage, index) => (
                        <tr key={newpackage._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{newpackage.nPname}</td>
                            <td>{newpackage.nPdescription}</td>
                            <td>{newpackage.nPprice}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm btn-success" style={{ backgroundColor: '#194486', color: 'white' }} to={`/update1/${newpackage._id}`}>Edit</Link>
                                <button onClick={() => handleDelete2(newpackage._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link
                className="btn btn-primary btn-sm btn-success" style={{ backgroundColor: '#194486', color: 'white' }}
                to={{
                    pathname: `/packageReport`,
                    state: { newpackagesData: newpackages } // Pass new packages data as state
                }}
            >
                Download New Packages Report
            </Link>
            
            
        
        </div>

        
    );
}