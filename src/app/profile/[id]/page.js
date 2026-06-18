import Link from "next/link";
import { cookies } from "next/headers";
import { getProfileById } from "@/services/profile.service";
import LikeButton from "@/app/components/LikeButton";

export default async function ProfilePage({
  params,
}) {
  const { id } = await params;

  const profile =
    await getProfileById(id);

  if (!profile) {
    return (
      <div className="p-10">
        Profile not found
      </div>
    );
  }

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")?.value;

  const isLoggedIn =
    !!token;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left Side */}

          <div>
            <img
              src={
                profile.image_url ||
                "https://via.placeholder.com/500"
              }
              alt={profile.full_name}
              className="w-full max-w-md h-[500px] object-cover object-top rounded-2xl border-4 border-pink-100 shadow-lg"
            />
          </div>

          {/* Right Side */}

          <div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {profile.full_name}
            </h1>

            <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100 space-y-3">

              <p>
                <strong>🎂 Age:</strong>{" "}
                {profile.age}
              </p>

              <p>
                <strong>⚧ Gender:</strong>{" "}
                {profile.gender}
              </p>

              <p>
                <strong>🏙 City:</strong>{" "}
                {profile.city}
              </p>

              <p>
                <strong>🕌 Religion:</strong>{" "}
                {profile.religion}
              </p>

              <p>
                <strong>🎓 Education:</strong>{" "}
                {profile.education}
              </p>

              <p>
                <strong>💼 Occupation:</strong>{" "}
                {profile.occupation}
              </p>

              <p>
                <strong>📏 Height:</strong>{" "}
                {profile.height}
              </p>

              <p>
                <strong>💍 Marital Status:</strong>{" "}
                {profile.marital_status}
              </p>

            </div>

            {isLoggedIn ? (
              <>
                <div className="mt-8 bg-gray-50 rounded-2xl p-5 border">

                  <h3 className="font-bold text-2xl mb-3">
                    About Me
                  </h3>

                  <p className="text-gray-700 leading-7">
                    {profile.about_me ||
                      "No description available"}
                  </p>

                </div>

                <div className="mt-8 flex flex-wrap gap-3">

                  <LikeButton
                    userId={profile.id}
                  />

                  <button className="w-14 h-14 rounded-xl border shadow hover:bg-blue-50 text-3xl">
                    💬
                  </button>

                  <button className="w-14 h-14 rounded-xl border shadow hover:bg-green-50 text-3xl">
                    📞
                  </button>

                  <a
                    href={`/api/profile/${profile.id}/download`}
                    className="w-14 h-14 rounded-xl border shadow flex items-center justify-center hover:bg-purple-50 text-3xl"
                  >
                    📄
                  </a>

                </div>
              </>
            ) : (
              <div className="mt-8 bg-pink-50 border border-pink-200 rounded-2xl p-5">

                <p className="mb-4">
                  Login to view full profile
                  details and contact
                  information.
                </p>

                <Link
                  href="/login"
                  className="inline-block bg-pink-600 text-white px-5 py-3 rounded-lg"
                >
                  Login Now
                </Link>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}