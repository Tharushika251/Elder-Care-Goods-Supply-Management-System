import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Success.css' 
import success from '../Assets/success.png'

const Success = () => {
    const navigate = useNavigate();
    return (
       <div class="flex justify-center items-center h-screen bg-gray-100"> 
         <div class="max-w-md bg-white rounded-lg shadow-md p-8">
           <h2 class="text-3xl text-green-600 font-bold mb-4">Payment Successful!</h2> 
           <p class="text-lg text-gray-800 mb-6">Thank you for your payment. Your order has been successfully processed.</p>
           <div class="flex justify-center mb-6"> <img src={success} alt="Success" class="h-32" /> </div>
           
           <div class="flex justify-center">
             <button class="button mr-3" onClick={()=>navigate('/')}> 
                Back to Shop
            </button> 
            </div>
         </div> 
       </div>     
    )
}

export default Success