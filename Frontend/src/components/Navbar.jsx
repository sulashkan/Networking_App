
import React from 'react'
import axiosInstance from '../api/axiousInstance'
import { Outlet, useNavigate , Link } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate();

  const profileHandler = async (e) => {
    e.preventDefault();
    navigate("/profile")
  }

  const requestHandler = (e) => {
    e.preventDefault();
    navigate('/request')
  }

  const logoutHandler = async () => {
     const logout =  await axiosInstance.get('/auth/logout');
     console.log(logout);
     navigate('/');
  }

  const connectionHandler =  (e) => {
     e.preventDefault();
     navigate('/connections')
  }

  return (
  <>
    <div className='flex justify-evenly bg-blue-500 p-2 gap-x-96'>
        <div>
            {/* <img className="h-10 " src='../assets/react.svg' height={50} width={90} alt="logo"></img> */}
            <Link to="/feed" className='font-bold italic text-2xl text-black hover:text-white'>Networking_App</Link>
        </div>
        <div className='flex gap-4 text-[20px]'>
            <button onClick={requestHandler} className="btn btn-accent">requests</button>
            <button onClick={connectionHandler} className="btn btn-secondary">connections</button>
            <button onClick={profileHandler} className='border-none rounded-4xl bg-black p-1' > 👤</button>
            <button onClick={logoutHandler} className='btn btn-dash' > Logout</button>
        </div>
    </div>

    <Outlet />
    </>
  )
}
