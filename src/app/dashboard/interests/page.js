import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import {
  getInterestedInMe,
} from "@/services/profile.service";
import Link from "next/link";

export default async function InterestsPage() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user =
    verifyToken(token);

  const profiles =
    await getInterestedInMe(
      user.id
    );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        💖 People Interested In Me
      </h1>

      {profiles.length === 0 && (
        <div className="bg-white rounded-xl shadow p-6">
          Nobody has shown interest yet.
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">

        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <img
              src={
                profile.image_url ||
                "https://via.placeholder.com/400"
              }
              alt=""
              className="w-full h-72 object-cover"
            />

            <div className="p-4">

              <h2 className="font-bold text-2xl">
                {profile.full_name}
              </h2>

              <p>
                Age: {profile.age}
              </p>

              <p>
                City: {profile.city}
              </p>

              <Link
                href={`/profile/${profile.id}`}
                className="block mt-4 text-center bg-pink-600 text-white py-2 rounded"
              >
                View Profile
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}