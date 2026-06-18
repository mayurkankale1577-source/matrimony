"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu({
  loggedIn,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="md:hidden text-3xl"
      >
        ☰
      </button>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-50
          transition-all duration-300
          ${
            open
              ? "bg-black/40 visible"
              : "bg-black/0 invisible"
          }
        `}
        onClick={() =>
          setOpen(false)
        }
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0
          h-screen w-full max-w-sm
          bg-white z-50
          shadow-2xl
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-xl font-bold text-pink-600">
            Menu
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="text-3xl"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col">

          <Link
            href="/"
            className="p-4 border-b"
            onClick={() =>
              setOpen(false)
            }
          >
            🏠 Home
          </Link>

          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                📊 Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                👤 My Profile
              </Link>

              <Link
                href="/dashboard/likes"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                ❤️ Likes
              </Link>

              <Link
                href="/dashboard/interests"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                💖 Interested In Me
              </Link>

              <Link
                href="/dashboard/messages"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                💬 Messages
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                Login
              </Link>

              <Link
                href="/register"
                className="p-4 border-b"
                onClick={() =>
                  setOpen(false)
                }
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}