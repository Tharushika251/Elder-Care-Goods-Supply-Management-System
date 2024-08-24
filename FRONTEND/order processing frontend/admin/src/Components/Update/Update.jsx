import React, { useEffect } from "react";
import './Update.css'
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () =>{
    const[name,setName] = React.useState('');
    const[category,setCategory] = React.useState('');
    const[old_price,setOld_price] = React.useState('');
    const[new_price,setNew_price] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:4000/product/${params.id}`);
        result = await result.json()
        setName(result.name)
        setCategory(result.category)
        setOld_price(result.old_price)
        setNew_price(result.new_price)
    }

    const updateProduct = async () =>{
        console.warn(name,category,old_price,new_price)
        let result = await fetch(`http://localhost:4000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,category,old_price,new_price}),
            headers:{
                'Content-Type':'Application/json'
            }
        });
        result = await result.json()
        if(result){
            navigate('/listproduct')
        }
        
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        // Regular expression to allow only letters and numbers, with the first character being a letter
        const validName = /^[a-zA-Z][a-zA-Z0-9]*$/;
        if (validName.test(value) || value === '') {
            setName(value);
        }
    }

    const handleOldPriceChange = (e) => {
        const value = e.target.value;
        // Regular expression to allow only numbers
        const validNumber = /^\d*\.?\d*$/;
        if (validNumber.test(value) || value === '') {
            setOld_price(value);
        }
    }

    const handleNewPriceChange = (e) => {
        const value = e.target.value;
        // Regular expression to allow only numbers
        const validNumber = /^\d*\.?\d*$/;
        if (validNumber.test(value) || value === '') {
            setNew_price(value);
        }
    }

    return(
        <div className="product">
            <h1>Edit Product Catelog Details</h1>
            <input type="text" placeholder="Name" className="inputBox"
                value={name} onChange={handleNameChange} />

            <input type="text" placeholder="Category" className="inputBox" value={category} readOnly style={{ color: 'gray' }} />
            <input type="text" placeholder="Old Price" className="inputBox"
                value={old_price} onChange={handleOldPriceChange} />

            <input type="text" placeholder="New Price" className="inputBox"
                value={new_price} onChange={handleNewPriceChange} />

            <button onClick={updateProduct} className="appButton">Edit Product</button>
        </div>
    )

}

export default UpdateProduct;