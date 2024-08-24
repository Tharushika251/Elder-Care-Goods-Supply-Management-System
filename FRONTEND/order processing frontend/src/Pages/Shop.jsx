import React from "react"
import Hero from "../Component/Hero/Hero"
import NewCollections from "../Component/NewCollections/NewCollections"
import Offers from "../Component/Offers/Offers"
import Popular from "../Component/Popular/Popular"
import './CSS/Shop.css'

const Shop = () => {
    return(
        <div className="shop-container">
            <Hero/>
            <Popular/>
            <Offers/>
            <NewCollections/>
        </div>
    )

    

}



export default Shop