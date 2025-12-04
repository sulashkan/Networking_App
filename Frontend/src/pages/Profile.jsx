import React, { useEffect , useState } from 'react'
import { Navbar } from '../components/Navbar';

import { ProfileDetails } from '../components/ProfileDetails';
import axiosInstanse from "../api/axiousInstance"

export const Profile = () => {
  const [prof , setProfile] = useState([]);


  useEffect(() => {
  const getProfile = async () => {
    try {
      const response = await axiosInstanse.get('/auth/user/profile');
      console.log("profile", response.data);
      setProfile(response.data);
        console.log("state" , prof)
    } catch (error) {
      console.log("profile error", error);
    }
  };

  getProfile();
}, []);

   console.log("after" , prof)
  return (
    <div className="hero min-h-[600px]"
  style={{
    backgroundImage:
      "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}>
   
    <ProfileDetails prof={prof[0] || {}}/>
    </div>
  )
}
