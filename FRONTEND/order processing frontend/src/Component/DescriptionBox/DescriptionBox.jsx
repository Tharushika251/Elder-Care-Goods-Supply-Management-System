import React from "react";
import './DescriptionBox.css'

const DescriptionBox = () => {
    return(
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Elevate your shopping experience with our carefully crafted descriptions 
                    that showcase the unique qualities of each product. Let us guide you 
                    through the world of exceptional goods, where every purchase brings joy and satisfaction.
                    Shop now and experience the difference with our premium selection of products!</p>
                    <p>
                    Each item in our catalog embodies quality, innovation, and functionality, designed 
                    to exceed your expectations. From cutting-edge technology to timeless classics, our products 
                    offer unparalleled performance and style.With detailed descriptions highlighting 
                    key features, benefits, and specifications, you'll have all the information you need to make 
                    informed purchasing decisions. Whether you're looking for state-of-the-art gadgets, elegant
                    accessories, or essential everyday items, our product catalog has something for everyone.
                    </p>
            </div>
        </div>
    )
}

export default DescriptionBox