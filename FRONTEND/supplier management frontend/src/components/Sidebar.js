import React, { useState, useEffect } from 'react';
import {
    FaCommentAlt,
    FaPen,
    FaReceipt,
    FaUserAlt, 
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import logoImage from './logo.jpg';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarHeight, setSidebarHeight] = useState("100%"); 
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/",
            name: "Inventory Messages",
            icon: <FaCommentAlt />
        },
        {
            path: "/placeorder",
            name: "Place Order",
            icon: <FaPen />
        },
        {
            path: "/supplierdetails",
            name: "Suppliers",
            icon: <FaUserAlt />
        },
        {
            path: "/report",
            name: "Payment Details",
            icon: <FaReceipt />
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const sidebar = document.querySelector('.sidebar');
            const sidebarTop = sidebar.offsetTop;
            const currentScrollPosition = window.scrollY;
            const newSidebarHeight = `${windowHeight - sidebarTop + currentScrollPosition}px`;
            setSidebarHeight(newSidebarHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="container">
            <div className="sidebar" style={{ height: sidebarHeight }}>
                <div className="top_section">
                    
                    <img src={logoImage} alt="Logo" className="logo" style={{ maxWidth: '100%', height: 'auto' }} />
                    
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
