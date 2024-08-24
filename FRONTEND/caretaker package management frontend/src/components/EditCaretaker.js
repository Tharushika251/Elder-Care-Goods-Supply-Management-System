import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCaretaker=()=>{
    const { id } = useParams(); 
    //const [loading, setLoading] = useState(true);
    const [caretaker, setCaretaker] = useState({
        //id: '',
        name: '',
        age: '',
        gender: '',
        contactNumber: '',
        workfee: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCaretaker = async () => {
            try {
                const res = await axios.get(`http://localhost:8072/caretaker/get/${id}`);
                const fetchedCaretaker = res.data.caretaker;
                setCaretaker({
                    name: fetchedCaretaker.name,
                    age: fetchedCaretaker.age,
                    gender: fetchedCaretaker.gender,
                    contactNumber: fetchedCaretaker.contactNumber,
                    workfee: fetchedCaretaker.workfee,
                });
                //setLoading(false); // Update loading state after successful fetch
            } catch (error) {
                console.error('Error fetching caretaker:', error);
                //setLoading(false); // Update loading state even on error
                // You can add additional error handling logic here (e.g., display an error message)
            }
        };

        fetchCaretaker();
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8072/caretaker/update/${id}`, caretaker)
            /*.then((res) => {
                alert('Caretaker updated successfully!');
                navigate('/AllCaretakers');
            })*/
            .then(res=>{
                if(res.data.status){
                    alert('Caretaker updated successfully!');
                    navigate('/'); 
                }else{
                    alert(res.data.error)
                }
            })
            .catch(err => console.log(err))
                
    };

    /*const handleChange = (e) => {
        const { name, value } = e.target;
        setCaretaker((prevCaretaker) => ({
            ...prevCaretaker,
            [name]: name === 'age' ? parseInt(value, 10) || '' : value,
        }));
    };*/

    /*if (loading) {
        return <div>Loading...</div>;
    }*/

    return (
        <div className="container">
            <h1>Edit Caretaker</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={caretaker.name}
                        onChange={(e)=>{
                            setCaretaker({...caretaker,name:e.target.value});
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        value={caretaker.age}
                        onChange={(e)=>{
                            setCaretaker({...caretaker,age:e.target.value});
                        }}                    
                        />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        value={caretaker.gender}
                        onChange={(e)=>{
                            setCaretaker({...caretaker,gender:e.target.value});
                        }}                   
                         />
                </div>
                <div className="form-group">
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactNumber"
                        value={caretaker.contactNumber}
                        onChange={(e)=>{
                            setCaretaker({...caretaker,contactNumber:e.target.value});
                        }}                  
                          />
                </div>
                <div className="form-group">
                    <label>Work Fee:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="workfee"
                        value={caretaker.workfee}
                        onChange={(e)=>{
                            setCaretaker({...caretaker,workfee:e.target.value});
                        }}                   
                         />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
export default EditCaretaker
