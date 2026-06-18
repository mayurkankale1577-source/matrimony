"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

alert(data.message);

if (res.ok) {
  window.location.href =
    "/dashboard";
}
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
      <div className="w-full max-w-md">
        <form
          onSubmit={loginUser}
          className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pink-600">
              Matrimony
            </h1>
  
            <p className="text-gray-500 mt-2">
              Welcome Back ❤️
            </p>
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
  
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium">
              Password
            </label>
  
            <input
              type="password"
              placeholder="Enter your password"
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
            Login
          </button>
  
          <div className="text-center mt-5">
            <p className="text-gray-600">
              Don't have an account?
            </p>
  
            <a
              href="/register"
              className="text-pink-600 font-semibold hover:underline"
            >
              Register Now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}