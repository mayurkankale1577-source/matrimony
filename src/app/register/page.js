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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-6 rounded"
      >
        <h1 className="text-2xl font-bold mb-4">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 mb-3"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <select
          className="w-full border p-2 mb-3"
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

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white px-4 py-2 rounded"
          type="submit"
        >
          Register
        </button>

        {message && (
          <p className="mt-3">{message}</p>
        )}
      </form>
    </div>
  );
}