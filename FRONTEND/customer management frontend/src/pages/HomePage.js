import React from "react";
import { Link } from 'react-router-dom';
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import "../styles/Home.css";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div className="Home">

      <Layout title={"Best offers "}>
        <h1 className="htitle">HomePage</h1>

        {/* Buttons in the first row */}
        <div className="button-container1">
          <Link to="http://localhost:3001/Shop"><button>PRODUCTS</button></Link>
          <button>CART</button>
          <Link to="http://localhost:3001/DonorDashboard"><button>DONATIONS</button></Link>
        </div>

        {/* Buttons in the second row */}
        <div className="button-container1">
          <button>CARETAKERS</button>
          <button>PAYMENT HISTORY</button>
          <button>OFFERS</button>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
