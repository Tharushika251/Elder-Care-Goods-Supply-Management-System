import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNewPackage=()=>{
    const { id } = useParams(); 
    //const [loading, setLoading] = useState(true);
    const [newpackage, setNewPackage] = useState({
        //id: '',
        nPname: '',
        nPdescription: '',
        nPprice: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNewPackage = async () => {
            try {
                const res = await axios.get(`http://localhost:8072/newpackage/get1/${id}`);
                const fetchedNewPackage = res.data.newpackage;
                setNewPackage({
                    nPname: fetchedNewPackage.nPname,
                    nPdescription: fetchedNewPackage.nPdescription,
                    nPprice: fetchedNewPackage.nPprice
                });
                //setLoading(false); // Update loading state after successful fetch
            } catch (error) {
                console.error('Error fetching newpackage:', error);
                //setLoading(false); // Update loading state even on error
                // You can add additional error handling logic here (e.g., display an error message)
            }
        };

        fetchNewPackage();
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8072/newpackage/update1/${id}`, newpackage)
            /*.then((res) => {
                alert('newpackage updated successfully!');
                navigate('/Allnewpackages');
            })*/
            .then(res=>{
                if(res.data.status){
                    alert('New Package updated successfully!');
                    navigate('/'); 
                }else{
                    alert(res.data.error)
                }
            })
            .catch(err => console.log(err))
                
    };

    /*const handleChange = (e) => {
        const { nPname, value } = e.target;
        setnewpackage((prevnewpackage) => ({
            ...prevnewpackage,
            [nPname]: nPname === 'age' ? parseInt(value, 10) || '' : value,
        }));
    };*/

    /*if (loading) {
        return <div>Loading...</div>;
    }*/

    return (
        <div className="container">
            <h1>Edit New Package</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>New Package Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nPname"
                        value={newpackage.nPname}
                        onChange={(e)=>{
                            setNewPackage({...newpackage,nPname:e.target.value});
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nPdescription"
                        value={newpackage.nPdescription}
                        onChange={(e)=>{
                            setNewPackage({...newpackage,nPdescription:e.target.value});
                        }}                    
                        />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="nPprice"
                        value={newpackage.nPprice}
                        onChange={(e)=>{
                            setNewPackage({...newpackage,nPprice:e.target.value});
                        }}                   
                         />
                
    
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
export default EditNewPackage
