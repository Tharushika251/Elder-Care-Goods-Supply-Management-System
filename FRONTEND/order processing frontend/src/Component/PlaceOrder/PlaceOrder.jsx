import React from "react";
import './PlaceOrder.css'
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from 'react-router-dom';


const PlaceOrder = ()=>{

    const {getTotalCartAmount} = useContext(ShopContext)

    const navigate = useNavigate();
    return(
            <form className="place-order">
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-feilds">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last name"/>
                    </div>
                    <input type="email" placeholder="Email address" />
                    <input type="text" placeholder="Street"/>
                    <div className="multi-feilds">
                        <input type="text" placeholder="City" />
                        <input type="text" placeholder="State"/>
                    </div>
                    <div className="multi-feilds">
                        <input type="text" placeholder="Zip code" />
                        <input type="text" placeholder="Country"/>
                    </div>
                    <input type="text" placeholder="Phone" />
                </div>
                <div className="place-order-right">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                    <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>${getTotalCartAmount()===0?0:3}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={()=>navigate('/createPayment')}>PROCEED TO PAYMENT</button>
                </div>
                </div>
            </form>
    )
}

export default PlaceOrder