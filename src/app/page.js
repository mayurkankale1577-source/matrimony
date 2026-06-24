import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getProfiles, getLikedProfileIds } from "@/services/profile.service";
import LikeButton from "@/app/components/LikeButton";

export default async function Home() {
  let profiles = [];

  try {
    profiles = await getProfiles();
  } catch (error) {
    console.error("Profiles Error:", error);
  }

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  let currentUser = null;

  if (token) {
    try {
      currentUser = verifyToken(token);
    } catch (error) {
      console.error("Token Error:", error);

      currentUser = null;
    }
  }

  let likedIds = [];

  if (currentUser) {
    try {
      likedIds = await getLikedProfileIds(currentUser.id);
    } catch (error) {
      console.error("Likes Error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}

      <section
        className="relative h-[500px] md:h-[650px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Find Your Perfect Life Partner ❤️
          </h1>

          <p className="text-lg md:text-2xl max-w-3xl mb-8">
            Join thousands of verified profiles and start your journey towards a
            happy marriage.
          </p>

          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-lg font-semibold"
              >
                Register Free
              </Link>

              <Link
                href="/login"
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}

      <section className="bg-white py-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-pink-600">10K+</h3>

              <p className="text-gray-600 mt-2">Verified Profiles</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-pink-600">5K+</h3>

              <p className="text-gray-600 mt-2">Successful Matches</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-pink-600">2K+</h3>

              <p className="text-gray-600 mt-2">Happy Marriages</p>
            </div>
          </div>
        </div>
      </section>
      {/* Profiles */}

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8">Latest Profiles</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={
                  profile.image_url ||
                  "https://via.placeholder.com/500x500?text=No+Photo"
                }
                alt={profile.full_name}
                className="w-full h-72 object-cover object-top"
              />

              <div className="p-4">
                <h4 className="font-bold text-lg">{profile.full_name}</h4>

                <p>Birth Place: {profile.birth_place || "N/A"}</p>

                <p>Education: {profile.education || "N/A"}</p>

                <p>Occupation: {profile.occupation || "N/A"}</p>

                <div className="flex gap-2 mt-4">
                  {currentUser ? (
                    currentUser.id !== profile.id && (
                      <LikeButton
                        userId={profile.id}
                        initialLiked={likedIds.includes(profile.id)}
                      />
                    )
                  ) : (
                    <Link
                      href="/login"
                      className="w-14 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <span className="text-3xl text-gray-400">♥</span>
                    </Link>
                  )}

                  <Link
                    href={currentUser ? "/dashboard/premium" : "/login"}
                    className="w-14 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-blue-50 transition"
                  >
                    <span className="text-2xl">💬</span>
                  </Link>

                  <Link
                    href={currentUser ? "/dashboard/premium" : "/login"}
                    className="w-14 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-green-50 transition"
                  >
                    <span className="text-2xl">📞</span>
                  </Link>

                  <Link
                    href={currentUser ? `/profile/${profile.id}` : "/login"}
                    className="flex-1 min-w-[130px] bg-pink-600 text-white py-2 rounded-lg text-center hover:bg-pink-700"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {profiles.length === 0 && (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Profiles unavailable</h3>

            <p className="text-gray-500 mt-2">Please try again later.</p>
          </div>
        )}
      </section>
    </main>
  );
}
