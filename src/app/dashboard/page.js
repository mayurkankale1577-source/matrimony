import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyToken } from "@/lib/auth";
import LogoutButton from "@/app/components/LogoutButton";

export default async function Dashboard() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {" "}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

          <p className="mt-2 text-gray-600">{user.email}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <div className="text-center border-b pb-4">
              <div className="w-20 h-20 rounded-full bg-pink-100 mx-auto flex items-center justify-center text-3xl">
                👤
              </div>

              <h2 className="font-bold mt-3 break-all">{user.email}</h2>

              <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <Link
                href="/"
                className="p-3 rounded bg-blue-50 hover:bg-blue-100"
              >
                🏠 Home
              </Link>

              <Link
                href="/dashboard/premium"
                className="p-3 rounded bg-pink-50 hover:bg-pink-100"
              >
                🔒 Premium
              </Link>

              <Link
                href="/dashboard/profile"
                className="p-3 rounded bg-pink-50 hover:bg-pink-100"
              >
                👤 My Profile
              </Link>

              <Link
                href="/dashboard/change-password"
                className="p-3 rounded bg-pink-50 hover:bg-pink-100"
              >
                🔒 Change Password
              </Link>

              <Link
                href="/dashboard/likes"
                className="p-3 rounded bg-pink-50 hover:bg-pink-100"
              >
                ❤️ Liked Persons
              </Link>
              <Link
                href="/dashboard/interests"
                className="p-3 rounded bg-pink-50 hover:bg-pink-100"
              >
                💖 Interested In Me
              </Link>

              <Link
                href="/dashboard/messages"
                className="p-3 rounded bg-pink-50 hover:bg-pink-100"
              >
                💬 Messages
              </Link>

              <LogoutButton />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold text-lg">My Profile</h3>

                <p className="text-gray-500 mt-2">
                  View your profile information.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold text-lg">Likes</h3>

                <p className="text-gray-500 mt-2">See people you liked.</p>
              </div>

              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold text-lg">Messages</h3>

                <p className="text-gray-500 mt-2">View conversations.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 mt-6">
              <h2 className="text-2xl font-bold mb-3">Dashboard Overview</h2>

              <p className="text-gray-600">
                Welcome to your Matrimony Dashboard. Complete your profile and
                upload photos to get more visibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
