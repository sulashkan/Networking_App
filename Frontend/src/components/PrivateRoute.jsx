import React from 'react'
import { Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem('token');

  return (
    <div>
        {token ? (<Outlet/>) : ( <Navigate to="/"/>)}
    </div>
  )
}
