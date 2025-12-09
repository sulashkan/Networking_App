import React, { useEffect, useState } from 'react'
import axiosInstance from "../api/axiousInstance"
// import { useSelector } from 'react-redux'
import FriendCard from '../components/FriendCard'

export const Friends =  () => {
    const [list , setList] = useState([])
    const [ friend , setFriend] = useState(false);


   useEffect( () => {
    const connections = async() => {
        try{
            const response = await axiosInstance.get("/friends/");
            console.log("friend" ,response.data)
            setList(response.data);
            setFriend(!friend);
        }catch(error){
            console.log("connection error" , error);
        }
    }
    connections();
   } , [])

  return (
    <div className='flex gap-3 ml-2'>
        {list.length > 0 ?
        (list?.map((u, index) => 
        (<FriendCard user={u.from ?? u.to}  key={index+1}/>)))
       : 
       (<div 
        className='w-full min-h-screen text-3xl flex 
        justify-center items-center'>
        No Connection yet</div>)
    }
    </div>
  )
}
