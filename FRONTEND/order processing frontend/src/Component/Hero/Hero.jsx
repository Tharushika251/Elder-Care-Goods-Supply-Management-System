import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_img from '../Assets/hero.png'


const Hero=() =>{
    return(
        <div className="hero">
            <div className='hero-left'>
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>

                    </div>
                    <p>Collection</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className='hero-right'>
                <img src={hero_img} alt="" />
            </div>
        </div>
    )
}

export default Hero