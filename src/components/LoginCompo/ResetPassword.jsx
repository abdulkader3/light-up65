import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FaArrowRight } from "react-icons/fa";

const ResetPassword = () => {
    const navigate = useNavigate()
    const auth = getAuth();

    const [email , setEmail] = useState('')

    const handleEmail=(event)=>{
        setEmail(event.target.value)
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        if(!email){
            alert('Enter Your Email')
        }else{
            sendPasswordResetEmail(auth, email)
            .then(() => {
              alert('varify your email')
              navigate('/loginPage')

            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
        }

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-gradient-to-r from-cyan-300 to-blue-300 shadow-lg rounded-lg p-8 md:w-1/3 w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email Address</label>
            <input onChange={handleEmail} type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out" placeholder="Enter your email" />
          </div>
          <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-700 focus:scale-110 transition-colors duration-300 ease-in-out"> Reset Password </button>
        </form>
        <div className="text-center mt-6">
          <Link to="/loginPage" className="flex justify-center text-lg items-center gap-3 text-black hover:font-bold transition-colors duration-300 ease-in-out">Go Back<FaArrowRight /> </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
