import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export default async function LikesPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const user = verifyToken(token);

  const [likedUsers] = await db.query(
    `
      SELECT
  users.id,
  users.full_name,
  profiles.birth_place,
  photos.image_url

      FROM likes

      INNER JOIN users
        ON users.id =
        likes.to_user_id

      LEFT JOIN profiles
        ON profiles.user_id =
        users.id

      LEFT JOIN photos
        ON photos.user_id =
        users.id

      WHERE likes.from_user_id = ?
      `,
    [user.id]
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">❤️ People I Liked</h1>

      {likedUsers.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No liked profiles yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {likedUsers.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={profile.image_url || "https://via.placeholder.com/400"}
                alt=""
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-xl">{profile.full_name}</h2>

                <p>Age: {profile.age}</p>

                <p>City: {profile.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
