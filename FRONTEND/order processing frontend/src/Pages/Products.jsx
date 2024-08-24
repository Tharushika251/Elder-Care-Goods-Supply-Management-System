import React, { useContext } from "react"
import Product2 from "../Component/Product2/Product2";
import { ShopContext } from '../Context/ShopContext'; 
import { useParams } from 'react-router-dom';
import ProductDisplay from "../Component/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Component/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Component/RelatedProducts/RelatedProducts";


const Products = () => {
    const {all_product}= useContext(ShopContext);
    const {productId} = useParams();
    const Products = all_product.find((e)=>e.id===Number(productId));
    return(
        <div>
            <Product2 Products={Products}/>
            <ProductDisplay Products={Products}/>
            <DescriptionBox/>
            <RelatedProducts/>
        </div>
    )
}

export default Products