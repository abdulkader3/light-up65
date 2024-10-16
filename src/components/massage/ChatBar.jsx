import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { chatUserData } from '../../slices/ChatUserSlice';
export const ChatBar = () => {
   // ========== data get from redux
   const sliceUser= useSelector((state)=>(state.counter.value))
   const dispatch = useDispatch() 
   // ========= react variables
   const [friends , setFriends]  = useState([])
 
   // ========== firebase variables
      const db = getDatabase();
     //  =============== realtime database
     useEffect(()=>{
       const starCountRef = ref(db, 'friends/' );
       onValue(starCountRef, (snapshot) => {
         let arr = []
         snapshot.forEach((item)=>{
           if(item.val().currentUserId == sliceUser.uid){
             arr.push({friendId: item.val().friendId, friendName: item.val().friendName, friendPhoto:item.val().friendPhoto, key:item.key})
           }
           else if(item.val().friendId == sliceUser.uid){
             arr.push({friendId: item.val().currentUserId, friendName: item.val().currentUserName, friendPhoto:item.val().currentUserPhoto, key:item.key})
 
           }
         })
         setFriends(arr)
       });
     } , [])
    //  =========== sending data to chatbox
    const handleUserData=(item)=>{
      dispatch(chatUserData(item))
      localStorage.setItem('chatUser' , JSON.stringify(item))
    }
  return (
    <div className='px-10 h-screen border-[1px] border-[#074173] bg-[#074173] overflow-hidden bg-opacity-50 py-2 '>
        <h1 className='text-lg font-semibold text-center mb-10 ' >Friends</h1>
        {
          friends.map((item)=>(
            <div onClick={()=>handleUserData(item)} key={item.key} className="flex justify-start gap-3 items-center mb-5 ">
             {/* <div className='flex items-center gap-5'>  */}
                <div className=" bg-green-100 user_image w-[30px] h-[30px] rounded-full overflow-hidden">
                 <img className='w-full h-full rounded-full' src={item?.friendPhoto} alt="user photo" />
                 </div>
                 <h2 className='text-lg font-semibold hidden md:block'>{item?.friendName} </h2>
             {/* </div> */}
         </div>
          ))
        }
    </div>
  )
}
