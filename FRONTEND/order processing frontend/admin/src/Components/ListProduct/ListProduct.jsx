import React, { useEffect, useRef, useState } from "react";
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { Link,useNavigate } from 'react-router-dom';


const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        })
        await fetchInfo();
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`);
            result = await result.json();
            if (result) {
                setAllProducts(result)
            }
        } else {
            fetchInfo()
        }

    }

    

    return (
        <div className="list-product">
            <div class="search-container">
                <input type="text" placeholder='Search' onChange={searchHandle} />
                <button  className='btn-generate-report' onClick={()=>navigate('/generatereport')}>Generate Report</button>
            </div>
            <h1>All Product List</h1>
            
                <div className="listproduct-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Edit</p>
                    <p>Remove</p>
                </div>
                <div className="listproduct-allproducts">
                    <hr />
                    {
                        allproducts.length > 0 ? allproducts.map((product, index) => {
                            return <>
                                <div key={index} className="listproduct-format-main listproduct-format">
                                    <img src={product.image} alt="" className="listproduct-product-icon" />
                                    <p>{product.name}</p>
                                    <p>${product.old_price}</p>
                                    <p>${product.new_price}</p>
                                    <p>{product.category}</p>
                                    <Link to={"/update/"+product._id}><img src={edit_icon} alt="" className="listproduct-edit-icon" /></Link>
                                    <img onClick={() => { remove_product(product.id) }} src={cross_icon} alt="" className="listproduct-remove-icon" />
                                </div>
                                <hr />
                            </>
                        })
                            : <h1>No Result Found</h1>
                    }
                </div>
            
        </div>

    )
}

export default ListProduct