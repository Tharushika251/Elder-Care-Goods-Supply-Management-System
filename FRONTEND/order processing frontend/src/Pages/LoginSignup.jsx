import React, { useState } from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state,setState]=useState("Login");
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const changeHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const login = async()=>{
        console.log("Login function executed",formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }

    const addcartuser = async()=>{
        console.log("addcartuser function executed",formData);
        let responseData;
        await fetch('http://localhost:4000/addcartuser',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token',responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }

    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address"/>
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={()=>{state==="Login"?login():addcartuser()}}>Continue</button>
                {state==="Sign Up"
                ?<p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}>Login here</span></p>
                :<p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Add Cart User")}}>Click here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>By continuing</p>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
