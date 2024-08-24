import React from "react";
import './Product2.css'
import arrow_icon from '../Assets/Product2_arrow.png'

const Product2 = (props) => {
    const {Products} = props;
    return(
        <div className="Product2"> 
            HOME <img src={arrow_icon} alt="" />SHOP <img src={arrow_icon} alt="" /> {Products.category} <img src={arrow_icon} alt="" /> {Products.name} 
        </div>
    )
}

export default Product2