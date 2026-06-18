"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.replace("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-3 rounded bg-red-100 hover:bg-red-200 text-left"
    >
      🚪 Logout
    </button>
  );
}