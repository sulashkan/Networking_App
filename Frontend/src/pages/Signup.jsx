import React from "react";
import { useState } from "react";
import axiosInstance from "../api/axiousInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/slices/authSlice";

export const Signup = () => {
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    skills: [],
    bio: "",
  });

  const clickHandler = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.post("/auth/signup", formData);
    if(!response) return console.log('signup error')
    console.log(response);
    dispatch(authActions.userInfo(response.data))
    navigate('/');
  }

  const addSkills = () => {
    if (skill.trim() === "") return;
    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
    });

    setSkill("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww)",
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2 bg-gradient-to-r from-gray-900 to-emerald-500 p-10 rounded-md"
      >
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
            placeholder="Password"
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
          <div className="flex gap-2">
            <input
              className="border rounded-md p-2"
              type="text"
              placeholder="Skills"
              name="skills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <button
              className="border p-2 rounded-2xl bg-blue-500"
              onClick={addSkills}
            >
              Add
            </button>
          </div>
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

        <button
          onClick={clickHandler}
          className="border p-1 w-20 rounded-xl ml-25 text-center btn btn-accent"
        >
          Singup
        </button>

        <p className=" text-center">Already registerd ? <Link to='/' className="border-b hover:text-black">Login</Link></p>
      </form>
    </div>
  );
};
