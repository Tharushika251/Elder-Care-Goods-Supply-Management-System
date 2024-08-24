import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import React, { useState } from "react";

const AddProduct = () =>{
    const [image,setImage]=useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"Mobility items",
        new_price:"",
        old_price:""
    })

    const [errors, setErrors] = useState({});

    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        const { name, value } = e.target;

        
        if (name === "old_price" || name === "new_price") {
            if (!/^\d*\.?\d*$/.test(value)) {
                return; 
            }
        }

        if (name === "name") {
            if (!/^[a-zA-Z][\w\s]*$/.test(value)) {
                return; 
            }
        }
        
    

        setProductDetails({...productDetails,[name]: value})
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!productDetails.name) {
            formIsValid = false;
            errors["name"] = "Please enter product title.";
        } else {
            errors["name"] = "";
        }

        if (!productDetails.old_price) {
            formIsValid = false;
            errors["old_price"] = "Please enter price.";
        } else {
            errors["old_price"] = "";
        }

        if (!productDetails.new_price) {
            formIsValid = false;
            errors["new_price"] = "Please enter offer price.";
        } else {
            errors["new_price"] = "";
        }

        if (
            productDetails.category !== "Mobility items" &&
            productDetails.category !== "Dry food" &&
            productDetails.category !== "Measurement Machines"
        ) {
            formIsValid = false;
            errors["category"] = "Please select a valid category.";
        } else {
            errors["category"] = "";
        }

        setErrors(errors);
        return formIsValid;
    }

    const Add_Product = async()=>{
        if(validateForm()) {
            console.log(productDetails);
            let responseData;
            let product = productDetails;

            let formData = new FormData();
            formData.append('product',image);

            await fetch('http://localhost:4000/upload',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                },
                body:formData,
            }).then((resp)=>resp.json()).then((data)=>{responseData=data});

            if(responseData.success)
            {
                product.image=responseData.image_url;
                console.log(product);
                await fetch('http://localhost:4000/addproduct',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(product),
                }).then((resp)=>resp.json()).then((data)=>{
                    data.success?alert("Product Added To Catalog"):alert("Failed")
                })
            }
        }
    }

    return(
        <div className="add-product">
            <h1>Add Product</h1>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder="Type here"/>
                {errors["name"] && <span className="error">{errors["name"]}</span>}
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder="Type here"/>
                    {errors["old_price"] && <span className="error">{errors["old_price"]}</span>}
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder="Type here"/>
                    {errors["new_price"] && <span className="error">{errors["new_price"]}</span>}
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                    <option value="Mobility items">Mobility items</option>
                    <option value="Dry food">Dry food</option>
                    <option value="Measurement Machines">Measurement Machines</option>
                </select>
                {errors["category"] && <span className="error">{errors["category"]}</span>}
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={Add_Product} className="addproduct-btn">ADD TO CATALOG</button>
        </div>
    )
}

export default AddProduct
