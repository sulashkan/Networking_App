import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const clickHandler = () => {
    console.log(formData)
  }

  const handleChange = (e) => {
     const {name , value } = e.target;
    setFormData({...formData , [name]: value});
  }

  

  return (
    <div className="w-full min-h-screen flex justify-center items-center"
     style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww)"
     } } >

      <form onSubmit={(e) => e.preventDefault()} className="w-[350px] z-10 min-h-[300px] flex flex-col  p-5 gap-6  border-black rounded-md bg-gradient-to-r from-gray-900 mask-b-to-cyan-100" >
        <div className="flex flex-col">
        <label>Email</label>
        <input
         className="border rounded-md p-2"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>

     <div className="flex flex-col">
           <label>Password</label>
        <input
         className="border rounded-md p-2"
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
     </div>
  <button onClick={clickHandler} className="border p-1 w-20 rounded-xl ml-25 text-center hover:bg-blue-400 btn btn-accent"> Login </button>
   <p className="text-blue-300 text-center">New User ? <Link to="/signup" className="border-b hover:text-blue-500">Signup</Link></p>
      </form>
    </div>
  );
};
