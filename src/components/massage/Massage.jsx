import React, { useEffect, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from "firebase/database";

export const Massage = () => {
  // ========= get data from redux
  const chatUsers = useSelector((state)=>state.chatData.value)
  const sliceuser = useSelector((state)=>state.counter.value)
  // ======= rect variables =====
  const [msg , setMsg ]  = useState('')
  const [massage , setMassage ]  = useState([])
  // ====== firebase variables
  const db = getDatabase();
    // ========= real time show ====
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;}
  // ========== functions
  const handleSend=(data)=>{
    set(push(ref(db, 'Massage/')), {
      senderId : sliceuser.uid,
      receiverId : chatUsers.friendId,
      MSG: msg,
      msgTime: formatAMPM(new Date)
    });
    setMsg('')
  
  }
  const handleKey =(e)=>{
    if(e.key =='Enter'){
      handleSend()
    }
  }
  useEffect(()=>{
    const starCountRef = ref(db, 'Massage/');
    onValue(starCountRef, (snapshot) => {
      let arr =[]
       snapshot.forEach((item)=>{
        if(item.val().senderId ==sliceuser.uid && item.val().receiverId == chatUsers.friendId){
          arr.push({...item.val(), key:item.key})
        }
        else if(item.val().receiverId ==sliceuser.uid && item.val().senderId == chatUsers.friendId){
          arr.push({...item.val(), key:item.key})
        }
       })
       setMassage(arr)
    });
  },[chatUsers])

  
  return (
    <div className='w-[500px] '>
        <div className="flex justify-between p-2 gap-8 w-full bg-[#074173] ">
             <div className='flex items-center gap-5 ml-3'> 
                <div className=" bg-green-100 user_image w-[50px] h-[50px] rounded-full overflow-hidden">
                 <img src={chatUsers?.friendPhoto} alt="user photo" />
                 </div>
                 <h2 className='text-lg text-white font-semibold'>{chatUsers?.friendName}</h2>
             </div>
         </div>
             <div className="massages p-5 w-full h-[440px] bg-white overflow-y-scroll">
              {
                massage.map((item)=>(
                  item.senderId == sliceuser.uid?
                  <div key={item.key} className=" mb-3">
                    <p  className='send w-fit py-1 px-3 ml-auto bg-[#78B7D0] mb-1 text-white rounded  '>{item?.MSG} </p>
                    <p  className=' text-sm w-fit py-1  ml-auto bg-transparent text-black rounded  '>{item?.msgTime} </p>
                  </div>
                  :
                  <div className="mb-3 flex flex-col items-start">
                    <p className='receive w-fit py-1 px-3 bg-[#074173] text-white mb-1 rounded  '>{item?.MSG} </p>
                    <p className=' text-sm w-fit py-1  bg-transparent text-black rounded  '>{item?.msgTime} </p>
                  </div>

                ))
              }
             </div>
             <div className="massageInput bg-white px-5 flex items-center border-t-[1px] border-t-[#074173]">
              <input 
                value={msg}
                onKeyDown={(e)=>handleKey(e)}
                onChange={(e)=>setMsg(e.target.value)}
                className='w-full h-[50px] outline-none pl-5 text-black font-semibold ' type="text" placeholder="Type a message..." />
              <button
                 onClick={handleSend} 
                 className='send_btn text-2xl text-[#074173] '>
                  <BsFillSendFill />
              </button>
             </div>
    </div>
  )
}
