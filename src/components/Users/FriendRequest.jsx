import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const FriendRequest = () => {
  // ========== get data from redux
  const sliceUser = useSelector((state)=>state.counter.value)
  // ========== variables 
  const [friendRequest , setFriendRequest] = useState([])
  // ========== firebase variables
     const db = getDatabase();
    //  =============== realtime database
    useEffect(()=>{
      const starCountRef = ref(db, 'friendrequest/');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(item.val().receiverId ==sliceUser.uid){
            arr.push({...item.val(), key:item.key})
         }
        })
        setFriendRequest(arr)
    });
    }, [])
    const handelConfirm = (data)=>{
      // ================ set data to friends collection 
      set(push(ref(db, 'friends/' )), {
        currentUserId: sliceUser.uid ,
        currentUserName: sliceUser.displayName ,
        currentUserPhoto: sliceUser.photoURL ,
        friendId: data.senderId,
        friendName: data.senderName , 
        friendPhoto: data.senderPhoto,
      });
      // ============== remove data from the friendRequest collection 
      remove(ref(db, 'friendrequest/' + data.key))
    }
    const handleRemove =(data)=>{
      remove(ref(db, 'friendrequest/' + data.key))

    }
  //  ============== console part

  return (
    <div className='container  flex justify-center items-center'>
      <div className="px-8 py-3 overflow-y-scroll bg-[#074173] bg-opacity-50 h-[500px] border-2 border-[#074173] rounded-lg mt-10 flex flex-col gap-6 p-5 ">
        <h2 className='text-lg font-medium font-poppins mt-5 text-center'>Friend requests</h2>
        {
            friendRequest.map((item)=>(
                <div key={item.key} className="singel_users flex justify-between gap-14 mb-5 ">
                <div className='flex items-center gap-5'> 
                   <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img src={item?.senderPhoto} alt="user photo" />
                    </div>
                    <h2 className='text-lg font-semibold'>{item?.senderName}</h2>
                </div>
                <div className="flex items-center gap-5">
                    <button onClick={()=>handelConfirm(item)} className='rounded-lg py-2 px-5 bg-[#074173] text-xl active:scale-95 transition-all text-white font-normal'>Confirm</button>
                    <button onClick={()=>handleRemove(item)} className='rounded-lg py-2 px-5 bg-red-800 text-xl active:scale-95 transition-all text-white font-normal'>Remove</button>
                </div>
            </div>
            ))
        }
        

      </div>
    </div>
  )
}
