import React,{useState} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function AddStaff(){

    const [name, setName]= useState("");
    const [nameError, setNameError] = useState("");
    const [age, setAge]= useState("");
    const [dob, setDob]= useState("");
    const [dobError, setDobError] = useState("");
    const [gender, setGender]= useState("");
    const [email, setEmail]= useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword]= useState("");
    const [address, setAddress]= useState("");
    const [contactno, setContactno]= useState("");
    const [contactnoError, setContactnoError] = useState("");
    const [NIC, setNic]= useState("");
    const [nicError, setNicError] = useState("");
    const [type, setType]= useState("");
    const [workexperience, setWorkexperience]= useState("");
    const [qulification, setQulification]= useState("");
    const [photo, setPhoto]= useState(null);
    const [nics, setNics] = useState([]);

    const navigate = useNavigate()

    // Validation function to check if the input contains only letters
const validateName = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
};

    const handleNameChange = (value) => {
        setName(value);
        if (!validateName(value)) {
            setNameError("Name should contain only letters.");
        } else {
            setNameError("");
        }
    };

    // Validation function to check if the contact number has 10 digits
    const validateContactNumber = (value) => {
        const regex = /^\d{10}$/;
        return regex.test(value);
    };

    const handleContactnoChange = (value) => {
        setContactno(value);
        if (!validateContactNumber(value)) {
            setContactnoError("Contact number must be 10 digits.");
        } else {
            setContactnoError("");
        }
    };

    // Validation function to check if the email address is in the correct format
    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError("Invalid email address.");
        } else {
            setEmailError("");
        }
    };
    

    // Handle DOB change
    const handleDobChange = (value) => {
        setDob(value);
        const age = calculateAge(value);
        if (age < 18) {
            setDobError("Must be 18 years or older.");
        } else {
            setDobError("");
            setAge(age);
        }
    };

    const validateNIC = (value) => {
        return !nics.includes(value);
      };
    
      const handleNICChange = (value) => {
        setNic(value);
        if (!validateNIC(value)) {
          setNicError("NIC already exists.");
        } else {
          setNicError("");
        }
      };

    // Calculate age from DOB
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

   

    function sendDeta(e){
        e.preventDefault();

        

     // Validate name
     if (!name.trim()) {
        alert("Name is required.");
        return;
    }

    if (!validateName(name)) {
        alert("Name should contain only letters.");
        return;
    } 

    // Validate DOB
    if (!dob.trim()) {
        alert("Date of Birth is required.");
        return;
    }

    if (dobError) {
        alert("Date of Birth must be 18 years or older.");
        return;
    }

     // Validate email address
     if (!validateEmail(email)) {
        alert("Invalid email address.");
        return;
    }

     // Validate NIC
     if (nics.includes(NIC)) {
        alert("NIC already exists.");
        return;
      }
        
        
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("address", address);
        formData.append("contactno", contactno);
        formData.append("NIC", NIC);
        formData.append("type", type);
        formData.append("workexperience", workexperience);
        formData.append("qulification", qulification);
        formData.append("photo", photo);
    
        axios.post("http://localhost:8070/staff/add", formData)

            .then(() => {
                alert("Staff Member Added");
                navigate('/dashboard/all')
                setNics([...nics, NIC]);
            })
            .catch((err) => {
                alert(err);
            });
    }

    return(
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
            <h3 className="text-center">Add Staff Member</h3>
            <form className="row g-1" onSubmit={sendDeta} encType="multipart/form-data">
                <div className="col-12">
                    <label for="inputName" className="form-lable">Full Name</label>
                    <input type="text" className="form-control rounded-0" id="inputName"  placeholder="Enter Full Name"
                    onChange={(e)=>{
                        handleNameChange(e.target.value);
                    }}
                    required
                    />
                     {nameError && <div className="text-danger">{nameError}</div>}
                </div>

                

                <div className="col-12">
                <label for="dob" className="form-lable">Date of Birth</label>
                <input type="date" className="form-control rounded-0" id="dob" 
                
                onChange={(e) => handleDobChange(e.target.value)}
                required
                />
                {dobError && <div className="text-danger">{dobError}</div>}
                </div>
                <div className="col-12">
                    <label for="age" className="form-lable">Age</label>
                    <input type="text" className="form-control rounded-0" id="age"  placeholder="Enter Age"
                    value={age}
                    disabled
                    />
                </div>

                <div className="col-12">
                <label for="gender" className="form-lable">Gender</label>
                <select  name= "gender" className="form-select" id="gender" 
                onChange={(e)=>{
                    setGender(e.target.value);
                }}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                </div>

                <div className="col-12">
                <label for="email" className="form-lable">Email</label>
                <input type="text" className="form-control rounded-0" id="email"  placeholder="Enter Email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                required
                />
                {emailError && <div className="text-danger">{emailError}</div>}
                </div>

                <div className="col-12">
                <label for="password" className="form-lable">Password</label>
                <input type="text" className="form-control rounded-0" id="password"  placeholder="Enter Password"
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                />
                </div>

                <div className="col-12">
                <label for="address" className="form-lable">Address</label>
                <textarea className="form-control rounded-0" id="address" rows="3"
                onChange={(e)=>{
                    setAddress(e.target.value);
                }}
                />
                </div>

                <div className="col-12">
                <label for="contactno" className="form-lable">Contact Number</label>
                <input type="text" className="form-control rounded-0" id="contactno"  placeholder="Enter Contact Number"
                value={contactno}
                onChange={(e) => handleContactnoChange(e.target.value)}
                required
                />
                 {contactnoError && <div className="text-danger">{contactnoError}</div>}
                </div>

                <div className="col-12">
                <label for="nic" className="form-lable">NIC</label>
                <input type="text" className="form-control rounded-0" id="nic"  placeholder="Enter NIC"
                onChange={(e) => handleNICChange(e.target.value)}
                />
                {nicError && <div className="text-danger">{nicError}</div>}
                </div>

                <div className="col-12">
                <label for="type" className="form-lable">Staff Member Type</label>
                <select name= "type" className="form-select" id="type"
                onChange={(e)=>{
                    setType(e.target.value);
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
                <textarea className="form-control rounded-0" id="workexperience" rows="3"
                onChange={(e)=>{
                    setWorkexperience(e.target.value);
                }}
                />
                </div>

                <div className="col-12">
                <label for="qulification" className="form-lable">Qualification</label>
                <textarea className="form-control rounded-0" id="qulification" rows="3"
                onChange={(e)=>{
                    setQulification(e.target.value);
                }}
                />
                </div>

                <div className="col-12 mb-3">
                <label for="photo" className="form-lable">Select Image</label>
                <input type="file" className="form-control rounded-0" id="photo" name="photo"

                onChange={(e)=>{
                    setPhoto(e.target.files[0]);
                }}
                />
                </div>

                <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">Add Staff Member</button>
                </div>
            </form>
            </div>
        </div>
    )
} 