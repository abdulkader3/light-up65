import React, { useState } from 'react'
import Lottie from 'lottie-react'
import loginanim from '../../../public/animations/loginanim.json'
import { IoEyeOff } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import '../LoginCompo/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userData } from '../../slices/UserSlice';
import BeatLoader from "react-spinners/BeatLoader";
import { getDatabase, ref, set } from "firebase/database";



export const Login = () => {
    // ====== variable part =====//
  
    const [email , setEmail]                            = useState('')
    const [emailError , setEmailError]                  = useState('')
    const [password , setPassword]                      = useState('')
    const [passwordError , setPasswrodError]            = useState('')
    const [show , setShow]                              =useState(false)
    const [loader , setLoader]                         = useState(false)
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    // ========= firebase variables ==========
     const db = getDatabase();
     const auth = getAuth();

    // ====== function part=====//
    const handelEmail =  (e)=>{
        setEmail(e.target.value)
        setEmailError('')
   }
   const handelPass  = (e)=>{
    setPassword(e.target.value)
    setPasswrodError('')
   }
   const handleShow =()=>{
    setShow(!show)
   }
   // ================= main submit function 
   const handelSubmit = (e)=>{
    e.preventDefault()

    if(!email){
            setEmailError('enter your email')
    }
    if(!password){
        setPasswrodError('Enater your password')
    }
    else{
      // ======= turn on loader
         setLoader(true)
        // ====== sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         if(user.emailVerified == false){
            // ===== varify email toast massage 
            toast.error('Varify your email!', {
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
                // ===== turn off loading
                setLoader(false)
         }
         else{
            // ===== success toast massage 
            toast.success('Login successful!', {
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
                // ============ Data store at local storage
                localStorage.setItem('userData', JSON.stringify(user) )
            // ========= navigate to home
                navigate('/')
            // ================ dispatch part
                dispatch(userData(user))
            // ================ realtime database part
            set(ref(db, 'Allusers/' + user.uid ), {
              userName: user.displayName,
              userPhoto: user.photoURL,
              uid: user.uid,
            });
          

         }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ===== wrong email toast massage 
    toast.error('Wrong email or Password', {
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
      // ======= turn off loading
      setLoader(false)
  });

        
       
            
    }
  }

  return (
    <div>
        <div className="container">
            <div className="form flex justify-around items-center w-full h-screen bg-[#5B2454] ">
                <div className="animation w-[350px] ">
                <Lottie animationData={loginanim} />
                </div>
                <div className="main-form bg-gradient-to-r from-[#FF8D89]  to-[#FB71B8] py-10 px-8 rounded-lg ">
                    <h1 className="login-head text-center">Login</h1>
                    <form onSubmit={handelSubmit}>
                        <lebel>Email</lebel>
                        <br/>
                        <input onChange={handelEmail} type="email" placeholder='Enter your Email' />
                        <p className="error">{emailError} </p>
                        <br></br>
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
                        <div className="text-right">
                          <Link to="/resetPassword" >Forgotten password?</Link>
                        </div>
                        <p className='error'>{passwordError} </p>
                        {
                            loader?
                            <div className="w-[400px] h-[50px] my-5 bg-[#893976] flex justify-center items-center rounded-[10px] ">
                              <BeatLoader color='#fff' />
                            </div>
                                :
                             <button type='submit' className="login-Button">Login</button>
                        }
                        
                        <p>Don't have any account? <Link to="/signuppage" className="text-lg font-poppins font-bold " >SignUp</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
