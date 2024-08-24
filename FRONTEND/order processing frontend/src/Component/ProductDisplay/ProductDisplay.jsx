import React from 'react';
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import add from '../Assets/add.png';
import add2 from '../Assets/add2.png';
import minus from '../Assets/minus.png';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = (props) => {
    const {Products} = props;
    const {addToCart,removeFromCart,cartItems} = useContext(ShopContext);

    const navigate = useNavigate();

    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={Products.image} alt="" />
                    <img src={Products.image} alt="" />
                    <img src={Products.image} alt="" />
                    <img src={Products.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={Products.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{Products.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${Products.old_price}</div>
                    <div className="productdisplay-right-price-new">${Products.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                Elevate your shopping experience with our carefully crafted descriptions that 
                showcase the unique qualities of each product. 
                
                </div>
                <div className="productdisplay-right-quantity">
                    <h1>Add Quantity</h1>
                    {!cartItems[Products.id]
                        ?<img src={add} alt="" className="addcart" onClick={()=>addToCart(Products.id)}/>
                        :<div className='item-counter'>
                            <img onClick={()=>removeFromCart(Products.id)} src={minus} alt="" />
                            <p>{cartItems[Products.id]} </p>
                            <img onClick={()=>addToCart(Products.id)} src={add2} alt="" />
                        </div>
                    
                    }

                </div>
                <button onClick={()=>navigate('/Cart')}>
                    ADD TO CART
                </button>

                <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay