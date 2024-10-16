import React from 'react'
import { useState } from 'react'
import Lottie from 'lottie-react'
import signup from '../../../public/animations/signup.json'
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import '../SignupCompo/signup.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { CSSProperties } from "react";
import BeatLoader from "react-spinners/BeatLoader";
 

export const SignUp = () => {
    // ============react variable part 
    const [Name , setName]                              = useState('')
    const [NameError , setNameError]                    = useState('')
    const [email , setEmail]                            = useState('')
    const [emailError , setEmailError]                  = useState('')
    const [password , setPassword]                      = useState('')
    const [passwordError , setPasswordError]            = useState('')
    const [confirmPassword , setConfirmPassword]        = useState('')
    const [confirmError , setConfirmError]              = useState('')
    const [show , setShow]                              = useState(false)
    const [confirmShow , setConfirmShow]                = useState(false)
    const navigate = useNavigate()

    // ================firebase variable part
    const auth = getAuth();
    const [loader , setLoader]                         = useState(false)


    // ====== function part=====//
    const handleName =(e)=>{
        setName(e.target.value)
        setNameError('')
    }
    const handelEmail =  (e)=>{
        setEmail(e.target.value)
        setEmailError('')
   }
   const handelPass  = (e)=>{
    setPassword(e.target.value)
    setPasswordError('')
   }
   const handelConfirm  = (e)=>{
    setConfirmPassword(e.target.value)
    setConfirmError('')
   }
   const handleShow =()=>{
    setShow(!show)
   }
   const handleConfirmShow =()=>{
    setConfirmShow(!confirmShow)
   }
   // ================= main submit funtion 
   const handelSubmit = (e)=>{ 
    e.preventDefault()

    if(!Name){
        setNameError('Enter your Name')
    }
    if(!email){
            setEmailError('Enter your email')
    }
    if(!password){
        setPasswordError('Enter your password')
    }
    if(!confirmPassword){
        setConfirmError('Confirm your password')
    }
    else{
        if(password !== confirmPassword){
            alert('Confirm password not machted')
        }else{
            // ========= Loader part starts
        setLoader(true)
        // ========= firebase code starts
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // ========= update profile and image
            updateProfile(auth.currentUser, {
                displayName: Name,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-GKjnABzDM6QtgdxFi3AVutidGiUDAr2QA&s"
              })
            // ========= Loader part starts
            setLoader(false)
            // ========= toast massage when success
            toast.success('varify your email!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
                console.log(userCredential)
                // ======= navigate part
                navigate('/loginPage')
                // ====== email verification part
                sendEmailVerification(auth.currentUser)
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoader(false);
            console.log(errorCode)
            // ====== password condition
            if(errorCode == 'auth/weak-password'){
                toast.error('weak password!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
            }
            // ======= email condition
             if(errorCode == 'auth/email-already-in-use'){
                toast.error('this email already exist!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
             }

          });
        }    
    }
  }
  return (
    <>
     <div className="container">
            <div className="form flex justify-around items-center w-full h-screen bg-[#283C46] bg-opacity-70 ">
                <div className="animation w-[400px] ">
                <Lottie animationData={signup} />
                </div>
                <div className="main_form  py-5 px-8 rounded-lg bg-[#D9D9D1] border-[2px] border-black ">
                    <h1 className="login_head text-center text-3xl">Sign Up</h1>
                    <form onSubmit={handelSubmit}>
                        {/* ====user name part==== */}
                        <lebel>Full Name</lebel>
                        <br/>
                        <input onChange={handleName} type="text" placeholder='Enter your Full Name' />
                        <br/>
                        <p className="error">{NameError} </p>
                        <br/>
                        {/* ====email part===== */}
                        <lebel>Email</lebel>
                        <br/>
                        <input onChange={handelEmail} type="email" placeholder='Enter your Email' />
                        <p className="error">{emailError} </p>
                        <br></br>
                        {/* ===password part==== */}
                        <lebel>Password</lebel>
                        <br/>
                        <div className="passdiv">
                            {
                                show?
                                <IoMdEye onClick={handleShow} className='eyeIcon'/>
                                :
                                <IoEyeOff onClick={handleShow} className='eyeIcon'/>
                            }
                          
                          <input onChange={handelPass} type={show?'text' :'password'} placeholder='Enter your password' />
                        </div>
                        <p className='error'>{passwordError} </p>
                        <br/>
                        {/* ====confirm password part====== */}
                        <lebel> Confirm Password</lebel>
                        <br/>
                        <div className="passdiv">
                            {
                                confirmShow?
                                <IoMdEye onClick={handleConfirmShow} className='eyeIcon'/>
                                :
                                <IoEyeOff onClick={handleConfirmShow} className='eyeIcon'/>
                            }
                          
                          <input onChange={handelConfirm} type={confirmShow?'text' :'password'} placeholder='Enter your password' />
                        </div>
                        <p className='error'>{confirmError} </p>
                        {/* ====button part===== */}
                        {
                            loader?
                            <div className="w-[350px] h-[40px] my-5 bg-[#4A6CD1] flex justify-center items-center rounded-[10px] ">
                              <BeatLoader color='#fff' />
                            </div>
                                :
                             <button type='submit' className="loginButton">Sign Up</button>
                        }
                        <p>Already have an account? <Link to="/loginPage" className="text-[16px] text-[#4A6CD] font-poppins font-bold " >Login</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
