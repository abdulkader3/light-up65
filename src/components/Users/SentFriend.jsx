import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";

export const SentFriend = () => {
     // ========== data get from redux
  const sliceUser= useSelector((state)=>(state.counter.value)) 
  // ========= react variables
  const [friends , setFriends]  = useState([])

  // ========== firebase variables
     const db = getDatabase();
    //  =============== realtime database
    useEffect(()=>{
      const starCountRef = ref(db, 'sentRequest/' );
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
            if(item.val().currentUserId == sliceUser.uid){
                arr.push({userid: item.val().userId, username: item.val().userName, userphoto: item.val().userPhoto,
                }) 
              }else if(item.val().senderId == sliceUser.uid){
                  arr.push({userid: item.val().currentUserId,username: item.val().currentUserName, userphoto: item.val().currentUserPhoto,})
              }
 
        })
        setFriends(arr)
        console.log(arr)
      });
    } , [])
    // ============ cencel friend part
    const handleUser =(data)=>{
      set(push(ref(db, 'Allusers/')),{
        userId: sliceUser.uid ,
        userName: sliceUser.displayName ,
        userPhoto: sliceUser.photoURL ,
       
       }) 
            console.log('mid')
 
       //  =========== remove data from friend collection
       remove(ref(db, 'sentRequest/' + data.key))
                  console.log('button')
      }
  return (
    <>
    <div className='container  flex justify-center items-center'>
      <div className="p-5 bg-[#074173] bg-opacity-50 h-[500px] border-2 border-[#074173] rounded-lg mt-10 flex flex-col gap-6 ">
        <h2 className='text-lg font-medium font-poppins mt-5 text-center'>Users</h2>

        {
          friends.map((item)=>(
            <div key={item.key} className="flex justify-between gap-8 mb-5 ">
             <div className='flex items-center gap-5'> 
                <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                 <img src={item.username} alt="user photo" />
                 </div>
                 <h2 className='text-lg font-semibold'>{item.userphoto} </h2>
             </div>
             <div className="flex justify-center items-center gap-2">
                 <button onClick={()=>handleUser(item)} className='rounded-lg py-2 px-3 bg-red-600 text-sm  text-white font-normal'>cancel request</button>
             </div>
         </div>
          ))
        }
           
      </div>
    </div>

    </>
  )
}
