import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue , set, push, remove  } from "firebase/database";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const User = () => {
  // ========== get data from redux
  const sliceUser = useSelector((state)=>state.counter.value)
  console.log(sliceUser)
  // ========== variables 
  const [allUsers , setAllUsers] =useState([])
  const [request, setRequest]=useState({});

  // ========== firebase variables
     const db = getDatabase();
    //  =============== realtime database
    useEffect(()=>{
      const starCountRef = ref(db, 'Allusers/');
      onValue(starCountRef, (snapshot) => {
        let merry = []
        snapshot.forEach((item)=>{
         if(item.val().uid !=sliceUser.uid){
          merry.push({...item.val(), key:item.key})
         } 
        })
        setAllUsers(merry)
    });
    }, [])
    // ====== function part
    const handleAdd =(items)=>{
      set(push(ref(db, 'friendrequest/')), {
       senderId : sliceUser.uid,
       senderName : sliceUser.displayName,
       senderPhoto : sliceUser.photoURL,
       receiverId : items.uid,
       receiverName :items.userName,
       receiverPhoto :items.userPhoto,
      });
      setRequest((prevStatus) => ({
        ...prevStatus,
        [items.uid]: true
      }));
    }
      //  ============== console part

  return (
    <div className='container flex justify-center items-center'>
      <div className="lg:px-8 lg:py-3 bg-[#074173] bg-opacity-50 h-[500px] border-2 border-[#074173] rounded-lg mt-10 flex flex-col gap-6 p-5 ">
        <h2 className='text-lg font-medium font-poppins mt-5 text-center'>People You may know</h2>

        {
          allUsers.map((item)=>(
            <div key={item.key} className="singel_users flex justify-between items-center gap-10 mb-5 ">
             <div className='flex items-center gap-5'> 
                <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                 <img src={item.userPhoto} alt="user photo" />
                 </div>
                 <h2 className='lg:text-lg font-semibold'>{item.userName} </h2>
             </div>
             <div className="">
             {
                request[item.uid] ?
                 <button className="flex justify-center items-center gap-[5px] text-white lg:text-sm  bg-gray-400 font-medium py-2 px-3 rounded">
                    Request sent
                 </button>
                 :
                 <button onClick={()=>handleAdd(item)} className="flex justify-center items-center gap-[5px] text-white lg:text-sm bg-[#074173] font-medium py-2 px-3 rounded-lg">
                     Add
                 </button>
              
             }
             </div>
         </div>
          ))
        }
          <Link to="/friendRequPage" className="text-right transition-all hover:text-white text-lg underline">See friend requests</Link> 
          <Link to="/blockPage" className="text-right transition-all hover:text-white text-lg underline">See Block List</Link> 
      </div>
    </div>
  )
}
