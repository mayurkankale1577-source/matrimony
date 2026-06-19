import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export default async function MessagesPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  const currentUser =
    verifyToken(token);

  const [users] = await db.query(
    `
    SELECT DISTINCT
      users.id,
      users.full_name

    FROM messages

    INNER JOIN users
      ON (
        users.id = messages.sender_id
        OR
        users.id = messages.receiver_id
      )

    WHERE
      (
        messages.sender_id = ?
        OR
        messages.receiver_id = ?
      )
      AND users.id != ?

    ORDER BY users.full_name
    `,
    [
      currentUser.id,
      currentUser.id,
      currentUser.id,
    ]
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          Messages
        </h1>

        {users.length === 0 ? (
          <p>
            No conversations yet
          </p>
        ) : (
          <div className="space-y-3">

            {users.map((user) => (
              <Link
                key={user.id}
                href={`/dashboard/messages/${user.id}`}
                className="block border rounded-lg p-4 hover:bg-gray-50"
              >
                <h2 className="font-semibold">
                  {user.full_name}
                </h2>
              </Link>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}