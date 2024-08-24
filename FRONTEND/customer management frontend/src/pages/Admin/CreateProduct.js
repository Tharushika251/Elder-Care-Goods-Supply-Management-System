import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import "../../styles/Adash.css";

const CreateProduct = ({ userDetails }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout title={"Dashboard - Print Details"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          
          
          
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

