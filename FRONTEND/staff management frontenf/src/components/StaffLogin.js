import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StaffLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8070/stafflogin/staff_login", values)
      .then((response) => {
        const { data } = response;
        if (data.message === "Login successful.") {
          // Redirect to staff detail page with staff data
          navigate(`staff_detail/${data.staff._id}`);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        setError("Invalid email or password.");
        console.error("Login error:", err);
      });
  };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
        <div className="text-danger">
            {error && error}

        </div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
            
            <div className='mb-3'>
                <lable htmlFor="email"><strong>Email:</strong></lable>
                <input type="email" name='email' autoComplete='off' placeholder='Enter Email' 
                onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <lable htmlFor="password"><strong>Password:</strong></lable>
                <input type="password" name='password' placeholder='Enter Password' 
                onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
            </div>
            <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
            <div className='mb-1'>
                <input type='checkbox' name="tick" id="tick" className='me-2' />
                <lable htmlFor="password">You are Agree with terms & conditions</lable>
                
            </div>
        </form>
    </div>
</div>
  )
}

export default StaffLogin