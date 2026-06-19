"use client";

import { useState } from "react";

export default function ChatBox({
  receiverId,
}) {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        "/api/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            receiverId,
            message,
          }),
        }
      );

      const data =
        await res.json();

      if (res.ok) {
        setMessage("");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t bg-white p-4 sticky bottom-0">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="💬 Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-5 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={loading}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-medium shadow"
        >
          {loading
            ? "..."
            : "➤"}
        </button>
      </div>
    </div>
  );
}