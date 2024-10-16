import React from 'react'
import Lottie from "lottie-react";
import notfound from "../../public/animations/notfound.json";
export const NotFoundPage = () => {
  return (
    <div className="bg-black w-full h-screen flex justify-center items-center ">
      <div className="w-[700px]">
        <Lottie animationData={notfound} loop={true} />;
      </div>
    </div>
  )
}
