"use client";

import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow md:hidden z-50">

      <div className="grid grid-cols-5 text-center py-2">

        <Link href="/">
          🏠
          <div className="text-xs">
            Home
          </div>
        </Link>

        <Link href="/dashboard/likes">
          ❤️
          <div className="text-xs">
            Likes
          </div>
        </Link>

        <Link href="/dashboard/interests">
          💖
          <div className="text-xs">
            Interest
          </div>
        </Link>

        <Link href="/dashboard/messages">
          💬
          <div className="text-xs">
            Chat
          </div>
        </Link>

        <Link href="/dashboard/profile">
          👤
          <div className="text-xs">
            Profile
          </div>
        </Link>

      </div>
    </div>
  );
}