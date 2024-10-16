import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar'
import { useSelector } from 'react-redux'

export const LayoutOne = () => {
  // =========== get data from redux
  const sliceUser = useSelector((state)=>state.counter.value)
  const navigate = useNavigate()

  useEffect(()=>{
    if(sliceUser == null){
      navigate('/loginPage')
    }

  } ,[])
  return (
    <div className=' relative flex justify-items-center'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
