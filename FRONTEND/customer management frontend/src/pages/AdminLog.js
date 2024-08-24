import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "../styles/AdminLog.css";
const Pagenotfound = () => {
  return (
    <div className="AdminLog">
     <Layout title={"Best offers "}>
      
       <h1 className="htitle1">ADMIN LOGIN</h1>
 
       {/* Buttons in the first row */}
       <div className="button-container2">
       <Link to="/Mlogin"><button>CUSTOMER MANAGER</button></Link>
       <button>ORDER PROCESSING MANAGER</button>
       <button>INVENTORY MANAGER</button>
       </div>
 
         {/* Buttons in the second row */}
         <div className="button-container2">
         <button>SUPPLIER MANAGER</button>
         <button>STAFF MANAGER</button>
         <Link to="http://localhost:3001/DonationManagerDashboard"><button>ELDER CARE DONATIONS MANAGER</button></Link>
       </div>

       {/* Buttons in the third row */}
       <div className="button-container2">
         <button>PAYMENT MANAGER</button>
         <button>CARETAKER PACKAGE MANAGER</button>
        
       </div>
 
    
       
     </Layout>
     </div>
   );
};

export default Pagenotfound;
