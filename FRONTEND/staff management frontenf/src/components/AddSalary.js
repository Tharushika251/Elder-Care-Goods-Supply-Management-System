import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [id, setMemberID] = useState('');
  const [name, setMemberName] = useState('');
  const [nameError, setNameError] = useState("");
  const [date, setDate] = useState('');
  const [basic, setBasicSalary] = useState('');
  const [othrs, setOvertimeHours] = useState('');
  const [otrate, setOvertimeRate] = useState('');
  const [bonus, setBonus] = useState('');
  const [totalSalary, setTotalSalary] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const calculateTotalSalary = () => {
    const overtimeTotal = Math.max(0, othrs) * Math.max(0, otrate);
    const total = Math.max(0, basic) + overtimeTotal + Math.max(0, bonus);
    setTotalSalary(total);
  };

   // Validation function to check if the input contains only letters
const validateName = (value) => {
  const regex = /^[a-zA-Z\s]*$/;
  return regex.test(value);
};

  const handleNameChange = (value) => {
    setMemberName(value);
      if (!validateName(value)) {
          setNameError("Name should contain only letters.");
      } else {
          setNameError("");
      }
  };

  const validateDate = (inputDate) => {
    const currentDate = new Date();
    const selectedDate = new Date(inputDate);
    if (selectedDate.toDateString() !== currentDate.toDateString()) {
      setError("Please select today's date.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    //Validate Date
    if (!date.trim()) {
      alert("Date is required.");
      return;
  }

    if (!validateDate(date)) return;

     // Validate name
     if (!name.trim()) {
      alert("Name is required.");
      return;
  }

  if (!validateName(name)) {
      alert("Name should contain only letters.");
      return;
  } 

   // Check for negative numbers
   if (basic < 0 || othrs < 0 || otrate < 0 || bonus < 0 || totalSalary < 0) {
    alert("Please enter positive numbers only.");
    return;
  }
  
    const formData = {
      id,
      name,
      date,
      basic,
      othrs,
      otrate,
      bonus,
      totalSalary
    };

    axios.post('http://localhost:8070/salary/addsal', formData)
      .then(response => {
        console.log(response.data);
        alert('Salary information added successfully!');
        navigate('/dashboard/salary')
        // Optionally reset the form after successful submission
        setMemberID('');
        setMemberName('');
        setDate('');
        setBasicSalary(0);
        setOvertimeHours(0);
        setOvertimeRate(0);
        setBonus(0);
        setTotalSalary(0);
      })
      .catch(error => {
        console.error('Error adding salary information:', error);
        alert('An error occurred while adding salary information.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Salary Details</h3>
        <form className="row g-1" encType="multipart/form-data">
          <div className="col-12">
            <label for="inputId" className="form-lable">Staff Member ID:</label>
            <input type="text" className="form-control rounded-0" id="inputId" value={id} placeholder="Enter Member Id"
              onChange={(e) => {
                setMemberID(e.target.value);
              }}
            />
          </div>

          <div className="col-12">
            <label for="name" className="form-lable">Staff Member Name </label>
            <input type="text" className="form-control rounded-0" id="name" value={name} placeholder="Enter Member Name"
              onChange={(e) => {
                handleNameChange(e.target.value);
              }}
              required
            />
            {nameError && <div className="text-danger">{nameError}</div>}
          </div>

          <div className="col-12">
            <label for="date" className="form-lable">Salary Date</label>
            <input type="date" className="form-control rounded-0" id="date" value={date}
              onChange={(e) => {
                const inputDate = e.target.value;
                setDate(inputDate);
                validateDate(inputDate);
              }}
              required
            />
            {error && <p className="text-danger">{error}</p>}
          </div>



          <div className="col-12">
            <label for="basic" className="form-lable">Basic Salary</label>
            <input type="number" className="form-control rounded-0" id="basic" value={basic} placeholder="Enter Basic Salary"
              onChange={(e) => {
                setBasicSalary(Math.max(0, parseFloat(e.target.value)));
              }}
            />
          </div>

          <div className="col-12">
            <label for="othrs" className="form-lable">Overtime Hours</label>
            <input type="number" className="form-control rounded-0" id="othrs" value={othrs} placeholder="Enter OT Hours"
              onChange={(e) => {
                setOvertimeHours(Math.max(0, parseFloat(e.target.value)));
              }}
            />
          </div>



          <div className="col-12">
            <label for="otrate" className="form-lable">Overtime Rate</label>
            <input type="number" className="form-control rounded-0" id="otrate" value={otrate} placeholder="Enter OT Rate"
              onChange={(e) => {
                setOvertimeRate(Math.max(0, parseFloat(e.target.value)));
              }}
            />
          </div>

          <div className="col-12">
            <label for="bonus" className="form-lable">Bonus</label>
            <input type="number" className="form-control rounded-0" id="bonus" value={bonus} placeholder="Enter Bonus"
              onChange={(e) => {
                setBonus(Math.max(0, parseFloat(e.target.value)));
              }}
            />
          </div>
          &nbsp;

          <div className="col-12 ">
            <button type="button" className="btn btn-primary w-100" onClick={calculateTotalSalary}>Calculate Total Salary</button>
            
            &nbsp;
            <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>Submit</button>

          </div>
        </form>
        <div>
          <h2>Total Salary: {totalSalary}</h2>
        </div>
      </div>
    </div>
  );
};

export default AddSalary;
