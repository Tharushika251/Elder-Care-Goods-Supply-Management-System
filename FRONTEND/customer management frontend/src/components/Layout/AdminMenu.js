import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Amenu.css";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4 className="h4">Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Admin Profile
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Print Details
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Customers
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
