import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

export const Friend = () => {
  // ========== data get from redux
  const sliceUser= useSelector((state)=>(state.counter.value)) 
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
    // ============ block friend part
    const handleBlock =(data)=>{
      set(push(ref(db, 'blockList/')),{
        currentUserId: sliceUser.uid ,
        currentUserName: sliceUser.displayName ,
        currentUserPhoto: sliceUser.photoURL ,
        friendId: data.friendId,
        friendName: data.friendName,
        friendPhoto: data.friendPhoto,
       }) 
            console.log('mid')
 
       //  =========== remove data from friend collection
       remove(ref(db, 'friends/' + data.key))
                  console.log('button')
      }
  
    
  return (
    <div className='container  flex justify-center items-center'>
      <div className="p-5 bg-[#074173] bg-opacity-50 h-[500px] border-2 border-[#074173] rounded-lg mt-10 flex flex-col gap-6 ">
        <h2 className='text-lg font-medium font-poppins mt-5 text-center'>Friends</h2>

        {
          friends.map((item)=>(
            <div key={item.key} className="flex justify-between gap-8 mb-5 ">
             <div className='flex items-center gap-5'> 
                <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                 <img src={item.friendPhoto} alt="user photo" />
                 </div>
                 <h2 className='text-lg font-semibold'>{item.friendName} </h2>
             </div>
             <div className="flex justify-center items-center gap-2">
                 <button className='rounded-lg py-2 px-3 bg-[#074173] text-sm  text-white font-normal'>Unfriend</button>
                 <button onClick={()=>handleBlock(item)} className='rounded-lg py-2 px-3 bg-red-600 text-sm  text-white font-normal'>Block</button>
             </div>
         </div>
          ))
        }
           
      </div>
    </div>
  )
}
