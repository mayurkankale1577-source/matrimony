"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        gender,
        email,
        password,
      }),
    });

    const data = await res.json();

    setMessage(data.message);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-600">
              Matrimony
            </h1>
  
            <p className="text-gray-500 mt-2">
              Create Your Account ❤️
            </p>
          </div>
  
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Full Name
            </label>
  
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Gender
            </label>
  
            <select
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
            >
              <option value="">
                Select Gender
              </option>
  
              <option value="male">
                Male
              </option>
  
              <option value="female">
                Female
              </option>
            </select>
          </div>
  
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Email
            </label>
  
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
  
          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-medium">
              Password
            </label>
  
            <input
              type="password"
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
  
          {message && (
            <div
              className={`mt-4 text-center text-sm font-medium ${
                message.toLowerCase().includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
  
          <div className="text-center mt-5">
            <p className="text-gray-600">
              Already have an account?
            </p>
  
            <a
              href="/login"
              className="text-pink-600 font-semibold hover:underline"
            >
              Login Now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}