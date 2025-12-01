import React from "react";
import { useState } from "react";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    skills: [],
    bio: "",
  });
 
  const clickHandler = () => {
    
  }
const handleChange = () => {

}

  return (
    <div className="w-full min-h-screen flex justify-center items-center"
     style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww)"
     } }
     >
      <form onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4 bg-gradient-to-r from-gray-900 to-emerald-500 p-10 rounded-md">
        <div className="flex flex-col ">
          <label>Name</label>
          <input
            className="border rounded-md p-2"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label>Email</label>
          <input
          className="border rounded-md p-2"
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label>Password</label>
          <input
          className="border rounded-md p-2"
            type="text"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label>Profession</label>
          <input
          className="border rounded-md p-2"
            type="text"
            placeholder="professtion"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label>Skills</label>
          <input
          className="border rounded-md p-2"
            type="text"
            placeholder="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col ">
          <label>Bio</label>
          <input
          className="border rounded-md p-2"
            type="text"
            placeholder="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button onClick={clickHandler} className="border p-1 w-20 rounded-xl ml-25 text-center btn btn-accent">Singup</button>
      </form>
    </div>
  );
};
