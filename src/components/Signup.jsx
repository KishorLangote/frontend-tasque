import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://backend-tasque.vercel.app/api/v1/user/signup",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      toast.success(data.message || "User registered successfully!");
      localStorage.setItem("jwt", data.token)
      navigate("/login")
      setUsername("")
      setEmail("")
      setPassword("")
    
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errors);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-5">Signup</h1>
        <form onSubmit={handleRegister}>
          {/* username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="">
              Username :
            </label>
            <input
              className="w-full border p-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type Username"
            />
          </div>

          {/* email */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="">
              Email :
            </label>
            <input
              className="w-full border p-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Email"
            />
          </div>

          {/* password */}
          <div className="mb-4 ">
            <label className="block mb-2 font-semibold" htmlFor="">
              Password :
            </label>
            <input
              className="w-full border p-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 text-white hover:bg-sky-600 rounded-md duration-300 p-2 font-semibold"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
