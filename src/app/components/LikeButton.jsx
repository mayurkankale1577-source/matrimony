"use client";

import { useState } from "react";

export default function LikeButton({
  userId,
  initialLiked = false,
}) {
  const [liked, setLiked] =
    useState(initialLiked);

  const handleLike =
    async () => {
      const res = await fetch(
        "/api/likes/toggle",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            to_user_id: userId,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        setLiked(data.liked);
      }
    };

    return (
      <button
        onClick={handleLike}
        className="flex items-center justify-center gap-2 px-4 py-2"
      >
        <span
          className={`text-4xl transition-all duration-300 ${
            liked
              ? "text-red-500 scale-110"
              : "text-gray-400"
          }`}
        >
          ♥
        </span>
    
        <span className="font-medium text-black">
          {liked ? "Liked" : "Like"}
        </span>
      </button>
    );
}