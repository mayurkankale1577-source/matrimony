import Link from "next/link";
import { cookies } from "next/headers";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  const loggedIn = !!token;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-2xl font-bold text-pink-600"
        >
          Matrimony
        </Link>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu loggedIn={loggedIn} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/"
            className="px-4 py-2 border rounded"
          >
            Home
          </Link>

          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 border rounded"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                className="px-4 py-2 bg-pink-600 text-white rounded"
              >
                My Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border rounded"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-pink-600 text-white rounded"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}