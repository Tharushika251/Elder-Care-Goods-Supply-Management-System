import React, { useState, useContext } from "react";
import axios from 'axios'
import './CreatePayment.css';
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const CreatePayment = () =>  {
    const [email, setEmail] = useState("");
    const [cardholder_name, setCardholder_name] = useState("");
    const [card_number, setCard_number] = useState("");
    const [expiry_date, setExpiry_date] = useState("");
    const [cvv, setCvv] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { clearCart } = useContext(ShopContext);


    /*const changeHandler = (e)=>{
        const { name, value } = e.target;

        
       

        if (cardholder_name === "cardholder_name") {
            if (!/^[a-zA-Z][\w\s]*$/.test(value)) {
                return; 
            }
        }
        
    

        setCardholder_name({...cardholder_name,[cardholder_name]: value})
    }*/
    const Save = (e) => {
        e.preventDefault();

        setError(""); // Reset error message

        // Regular expression for valid card number pattern
        const cardNumberPattern = /^\d{16}$/;
       
        const today = new Date();
        const selectedDate = new Date(expiry_date);
        if (selectedDate <= today) {
            setError("Expiry Date should be a future date.");
            return;
        }

        // Validate individual fields
        if (!email || email.toLowerCase().startsWith("carters")) {
            setError("Email is required and should not start with 'carters'.");
            return;
        }
        if (!cardholder_name) {
            setError("Cardholder Name is required");
            return;
        }
        /*if (cardholder_name === "cardholder_name") {
            if (!/^[a-zA-Z][\w\s]*$/.test(value)) {
                return; 
            }
        }*/

        if (!card_number) {
            setError("Card Number is required");
            return;
        }

        if (!cardNumberPattern.test(card_number)) {
                setError("Card Number is invalid, please enter a valid card number");
                return;
        }
        if (!expiry_date) {
            setError("Expiry Date is required");
            return;
        }

        if (!cvv) {
            setError("CVV is required");
            return;
        }
        if (!cvv) {
            setError("CVV is required");
            return;
        }

        
        axios
  .post('http://localhost:4000/CreatePayment', { email, cardholder_name, card_number, expiry_date, cvv })
  .then((result) => {
    console.log(result);
    axios.post('http://localhost:4000/clearcart', {}, { withCredentials: true }) // Call the clearcart endpoint
      .then((response) => {
        console.log(response.data);
        clearCart(); // Clear the cart locally on the client side
        navigate('/success');
      })
      .catch((error) => {
        console.error('Error clearing cart:', error);
        // Handle error
      });
  })
  .catch((err) => console.log(err));
    };

    const handleCardholderNameChange = (e) => {
        const input = e.target.value;

        // Check if the input starts with a number
        if (!isNaN(input.charAt(0))) {
            setError("Cardholder Name should start with a letter.");
        } else {
            setError("");
            setCardholder_name(input);
        }
    };


    return (
        <div className='d-flex'>
            <div className='w-30 rounded p-3' style={{ backgroundColor: '#E5E8E8' }}>
                <form onSubmit={Save}>
                    <h2>Card Details Form</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Email" className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="cardholder_name">Cardholder Name</label>
                        <input type="text" id="cardholder_name" placeholder="Cardholder Name" className='form-control' onChange={(e) => setCardholder_name(e.target.value)} value={cardholder_name} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="card_number">Card Number</label>
                        <input type="text" id="card_number" placeholder="Card Number" className='form-control' onChange={(e) => setCard_number(e.target.value)} value={card_number} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="expiry_date">Expiry Date</label>
                        <input type="date" id="expiry_date" placeholder="Expiry Date" className='form-control' onChange={(e) => setExpiry_date(e.target.value)} value={expiry_date} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="CVV" className='form-control' onChange={(e) => setCvv(e.target.value)} value={cvv} />
                    </div>
                    <button className="btn btn-success" onClick={(e) => { Save(e); navigate('/success'); }}>Pay Here</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePayment;