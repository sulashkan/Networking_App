import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
    import Cookies from 'js-cookie';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');
       
  return (
    <div>
        {token ? (<Outlet/>) : ( <Navigate to="/"/>)}
    </div>
  )
}
