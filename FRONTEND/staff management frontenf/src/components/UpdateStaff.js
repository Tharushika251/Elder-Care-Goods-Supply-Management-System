import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateStaff = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState({
        name: '',
        age: '',
       
        gender: '',
        email: '',
        address: '',
        contactno: '',
        NIC: '',
        type: '',
        workexperience: '',
        qulification: '',
    });

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8070/staff/get/${id}`)
            .then(result => {
                const fetchedStaff = result.data.staff;
                setStaff({
                    name: fetchedStaff.name,
                    age: fetchedStaff.age,
                    
                    
                    gender: fetchedStaff.gender,
                    email: fetchedStaff.email,
                    address: fetchedStaff.address,
                    contactno: fetchedStaff.contactno,
                    NIC: fetchedStaff.NIC,
                    type: fetchedStaff.type,
                    workexperience: fetchedStaff.workexperience,
                    qulification: fetchedStaff.qulification,
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8070/staff/update/${id}`, staff)
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/all')
                } else {
                    alert(result.data.error)
                }
            }).catch(err => console.log(err))
    }


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Update Staff Member</h3>
                <form className="row g-1" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputName" className="form-lable">Full Name</label>
                        <input type="text" className="form-control rounded-0" id="inputName" placeholder="Enter Full Name" value={staff.name}
                            onChange={(e) => {
                                setStaff({ ...staff, name: e.target.value });
                            }}
                        />
                    </div>

                    <div className="col-12">
                        <label for="age" className="form-lable">Age</label>
                        <input type="text" className="form-control rounded-0" id="age" placeholder="Enter Age" value={staff.age}
                            onChange={(e) => {
                                setStaff({ ...staff, age: e.target.value });
                            }}
                        />
                    </div>

                    


                    <div className="col-12">
                        <label for="gender" className="form-lable">Gender</label>
                        <select name="gender" className="form-select" id="gender" value={staff.gender}
                            onChange={(e) => {
                                setStaff({ ...staff, gender: e.target.value });
                            }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label for="email" className="form-lable">Email</label>
                        <input type="text" className="form-control rounded-0" id="email" placeholder="Enter Email" value={staff.email}
                            onChange={(e) => {
                                setStaff({ ...staff, email: e.target.value });
                            }}
                        />
                    </div>


                    <div className="col-12">
                        <label for="address" className="form-lable">Address</label>
                        <textarea className="form-control rounded-0" id="address" rows="3" value={staff.address}
                            onChange={(e) => {
                                setStaff({ ...staff, address: e.target.value });
                            }}
                        />
                    </div>

                    <div className="col-12">
                        <label for="contactno" className="form-lable">Contact Number</label>
                        <input type="text" className="form-control rounded-0" id="contactno" placeholder="Enter Contact Number" value={staff.contactno}
                            onChange={(e) => {
                                setStaff({ ...staff, contactno: e.target.value });
                            }}
                        />
                    </div>

                    <div className="col-12">
                        <label for="nic" className="form-lable">NIC</label>
                        <input type="text" className="form-control rounded-0" id="nic" placeholder="Enter NIC" value={staff.NIC}
                            onChange={(e) => {
                                setStaff({ ...staff, NIC: e.target.value });
                            }}
                        />
                    </div>

                    <div className="col-12">
                        <label for="type" className="form-lable">Staff Member Type</label>
                        <select name="type" className="form-select" id="type" value={staff.type}
                            onChange={(e) => {
                                setStaff({ ...staff, type: e.target.value });
                            }}
                        >
                            <option value="coustormermanager">Coustormer Manager</option>
                            <option value="orderprocessingmanger">Orderprocessing Manger</option>
                            <option value="inventorymanager">Inventory Manager</option>
                            <option value="suppliermanager">Supplier Manager</option>
                            <option value="staffmanager">Staff Manager</option>
                            <option value="donationmanager">Donation Manager</option>
                            <option value="paymentmanager">Payment Manager</option>
                            <option value="packagemanager">Package Manager</option>
                            <option value="caretaker">caretaker</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label for="workexperience" className="form-lable">Work Experiences</label>
                        <textarea className="form-control rounded-0" id="workexperience" rows="3" value={staff.workexperience}
                            onChange={(e) => {
                                setStaff({ ...staff, workexperience: e.target.value });
                            }}
                        />
                    </div>

                    <div className="col-12">
                        <label for="qulification" className="form-lable">Qualification</label>
                        <textarea className="form-control rounded-0" id="qulification" rows="3" value={staff.qulification}
                            onChange={(e) => {
                                setStaff({ ...staff, qulification: e.target.value });
                            }}
                        />
                    </div>



                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">Update Staff Member</button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default UpdateStaff