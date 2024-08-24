/*
import React,{useState} from "react";
import axios from "axios";
import caretakerImage from "./e.png"; // Import your caretaker image


export default function AddCaretakers(){
    
    const [name,setName]= useState("");
    const [age,setAge]= useState("");
    const [gender,setGender]= useState("");
    const [contactNumber,setContactNumber]= useState("");
    const [workfee,setWorkFee]= useState("");
    

    function sendData(e){
        e.preventDefault();
        //alert("Insert");
        const newCaretaker ={
            name,
            age,
            gender,
            contactNumber,
            workfee
            
        }
        //console.log(newNewPackage );
        axios.post("http://localhost:8072/caretaker/add",newCaretaker).then(()=>{
            alert("New caretaker added.")
            setName("");
            setAge("");
            setGender("");
            setContactNumber("");
            setWorkFee("");
            

        }).catch((err) => {
            console.log(err.response); // Log the response for debugging
            alert(err); // Show a general error message to the user
        });

    }
    const changeHandler = (e) => {
        const { name, value } = e.target;
      
        if (name === "name") {
          if (!/^[a-zA-Z][\w\s]*$/.test(value)) {
            return;
          }
        }
      
        if (name === "age") {
          // Validate age (must be a number and >= 18)
          const ageValue = parseInt(value, 10);
          if (isNaN(ageValue) || ageValue < 18) {
            return;
          }
        }
      
        // Handle other fields similarly
      
        switch (name) {
          case "name":
            setName(value);
            break;
          case "age":
            setAge(value);
            break;
          case "gender":
            setGender(value);
            break;
          case "contactNumber":
            setContactNumber(value);
            break;
          case "workfee":
            setWorkFee(value);
            break;
          default:
            break;
        }
      };
      
    const styles = {
        imageContainer: {
          position: 'absolute',
          right: '10px',
          zIndex: '1'
        },
        caretakerImage: {
          width: '800px', 
          height: 'auto' 
        },
        line: {
            backgroundColor:'blue',
            width: '100%',
            height:'5px',
            border: '1px solid #ccc',
            margin: '20px 0',
        },
      };
      

    return(
        <div className="container">
            <h1>Add Caretakers</h1>
            <div style={styles.imageContainer}>
        <img src={caretakerImage} alt="Caretaker" style={styles.caretakerImage} />
      </div><hr style={styles.line} /><br/><br/>
            <form onSubmit={sendData}>
                <div class="form-group">
                    <label for="newCaretakerName"> Name of New Caretaker </label>
                   
                    <input
            type="text"
            className="form-control"
            id="careName"
            placeholder="Enter new Caretakers' Name"
            name="name"
            value={name}
            onChange={changeHandler}
          />
                </div>

                <div class="form-group">
                    <label for="age">Age</label>
                    <input type="text" class="form-control" id="age" placeholder="Enter age of caretaker"onChange={(e)=>{
                        setAge(e.target.value);
                    }} style={{ width: '300px' }} />
                </div>
                
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <input type="text" class="form-control" id="gender" placeholder="Enter Price" onChange={(e)=>{
                        setGender(e.target.value);
                    }} style={{ width: '300px' }} />
                </div>
                <div class="form-group">
                    <label for="contactNumber">Contact Number</label>
                    <input type="text" class="form-control" id="contactNumber" placeholder="Enter Contact Number" onChange={(e)=>{
                        setContactNumber(e.target.value);
                    }} style={{ width: '300px' }} />
                </div>
                <div class="form-group">
                    <label for="workfee">workfee</label>
                    <input type="text" class="form-control" id="workfee" placeholder="Enter workfee" onChange={(e)=>{
                        setWorkFee(e.target.value);
                    }} style={{ width: '300px' }} />
                </div>

                


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <br/>
            <hr style={styles.line} />
        </div>
    )
}
*/
import React, { useState } from "react";
import axios from "axios";
import caretakerImage from "./e.png"; // Import your caretaker image

export default function AddCaretakers() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [workfee, setWorkFee] = useState("");
  const [dob, setDob] = useState("");

  function sendData(e) {
    e.preventDefault();
    const calculatedAge = calculateAge(dob);
  if (calculatedAge === null) {
    alert("Caretaker must be at least 18 years old.");
    return;
  }
    const newCaretaker = {
      name,
      age: calculateAge(dob), // Calculate and include age based on date of birth
      gender,
      contactNumber,
      workfee,
    };
    console.log("Sending request with data:", newCaretaker);
  
    axios
      .post("http://localhost:8072/caretaker/add", newCaretaker)
      .then((response) => {
        console.log("Response from server:", response.data);
        alert("New caretaker added.");
        setName("");
        setAge("");
        setGender("");
        setContactNumber("");
        setWorkFee("");
      })
      .catch((err) => {
        console.log("Error:", err.response); // Log the Axios error response
        alert("Error adding caretaker. Please check console for details.");
      });
  }
  
  
  

  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 ? age : null;
  };

  const validateContactNumber = (number) => {
    // Remove non-digit characters and check if length is exactly 10
    const cleanedNumber = number.replace(/\D/g, ""); // Remove non-digit characters
    return cleanedNumber.length === 10;
  };
  const validateWorkFee = (value) => {
    // Allow only numbers (positive integers) in the work fee field
    return /^\d+$/.test(value);
  };


  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      setAge(calculateAge(value));
    } else if (name === "name") {
      if (!/^[a-zA-Z][\w\s]*$/.test(value)) {
        return;
      }
    }else if (name === "gender") {
        // Ensure only "female" or "male" values are allowed for gender
        if (value !== "female" && value !== "male") {
          return;
        }
      } else if (name === "contactNumber") {
        if (!validateContactNumber(value)) {
          return;
        }}
        else if (name === "workfee") {
            if (!validateWorkFee(value)) {
              return;
            }
          }

    switch (name) {
      case "name":
        setName(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "contactNumber":
        setContactNumber(value);
        break;
      case "workfee":
        setWorkFee(value);
        break;
      default:
        break;
    }
  };

  const styles = {
    imageContainer: {
      position: "absolute",
      right: "10px",
      zIndex: "1",
    },
    caretakerImage: {
      width: "800px",
      height: "auto",
    },
    line: {
      backgroundColor: "blue",
      width: "100%",
      height: "5px",
      border: "1px solid #ccc",
      margin: "20px 0",
    },
  };

  return (
    <div className="container">
      <h1>Add Caretakers</h1>
      <div style={styles.imageContainer}>
        <img src={caretakerImage} alt="Caretaker" style={styles.caretakerImage} />
      </div>
      <hr style={styles.line} />

      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="careName"> Name of New Caretaker </label>
          <input
            type="text"
            className="form-control"
            id="careName"
            placeholder="Enter new Caretaker's Name"
            name="name"
            value={name}
            onChange={changeHandler}
            style={{ width: "500px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            placeholder="Enter Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            placeholder="Age will be auto-generated from Date of Birth"
            value={age}
            style={{ width: "300px" }}
            disabled
          />
        </div>
                
        <div className="form-group">
          <label>Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={changeHandler}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={changeHandler}
              />
              Male
            </label>
          </div>
        </div>
        <div className="form-group">
  <label htmlFor="contactNumber">Contact Number</label>
  <input
    type="text"
    className="form-control"
    id="contactNumber"
    placeholder="Enter Contact Number"
    name="contactNumber"
    value={contactNumber}
    onChange={(e) => setContactNumber(e.target.value)}
    style={{ width: "300px" }}
  />
</div>


<div className="form-group">
          <label htmlFor="workfee">Work Fee</label>
          <input
            type="text"
            className="form-control"
            id="workfee"
            placeholder="Enter work fee"
            name="workfee"
            value={workfee}
            onChange={changeHandler}
            style={{ width: "300px" }}
            pattern="[0-9]*" // Allow only numbers (no decimals) in the input field
          />
        </div>

                


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <br/>
            <hr style={styles.line} />
        </div>
    )
}
