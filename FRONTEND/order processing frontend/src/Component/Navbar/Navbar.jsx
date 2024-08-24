import React, { useContext, useState } from 'react' 
import './Navbar.css'
import logo from '../Assets/logo.jpg'
import cart_icon from '../Assets/cartIcon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () =>{
    
        const [menu,setMenu] = useState("Shop");
        const {getTotalCartItems} = useContext(ShopContext);
        
    return(
        <div className='navbar'>
            <div className= 'nav-logo'>
                <img src= {logo} alt=""/>
                <p>ForeverCaring Corner</p>
            </div>
            <ul className = "nav-menu">
                <li onClick={()=>{setMenu("Shop")}}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Mobility Items")}}><Link style={{ textDecoration: 'none' }} to='/mobilityItems'>Mobility Items</Link>{menu==="Mobility Items"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Mesurement Machines")}}><Link style={{ textDecoration: 'none' }} to='/mesurementMachines'>Mesurement Machines</Link>{menu==="Mesurement Machines"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("Dry Food")}}><Link style={{ textDecoration: 'none' }} to='/dryFoods'>Dry Food</Link>{menu==="Dry Food"?<hr/>:<></>}</li>
            </ul>

            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :<Link to='./login'><button>Login</button></Link>}
                
                <Link to='/Cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar