
import db from "@/lib/db";
import { redirect } from "next/navigation";
import {
    getMessages,
    markMessagesSeen,
    getUserById,
  } from "@/services/message.service";
  
  import { cookies } from "next/headers";
  import { verifyToken } from "@/lib/auth";
  import ChatBox from "@/app/components/ChatBox";
  import Link from "next/link";
  
  export default async function ChatPage({
    params,
  }) {
    try {
      const { id } = await params;
  
      const cookieStore =
        await cookies();
  
      const token =
        cookieStore.get("token")?.value;
  
      if (!token) {
        return (
          <div className="p-10 text-center">
            Please Login
          </div>
        );
      }
  
      let currentUser;
  
      try {
        currentUser =
          verifyToken(token);
          const [userRows] = await db.query(
            `
            SELECT is_premium
            FROM users
            WHERE id = ?
            `,
            [currentUser.id]
          );
          
          if (!userRows[0]?.is_premium) {
            redirect("/dashboard/premium");
          }
      } catch {
        return (
          <div className="p-10 text-center">
            Invalid Session
          </div>
        );
      }
  
      await markMessagesSeen(
        currentUser.id,
        Number(id)
      );
  
      const messages =
        await getMessages(
          currentUser.id,
          Number(id)
        );
  
      const otherUser =
        await getUserById(
          Number(id)
        );
  
      return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
  
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[80vh] flex flex-col">
  
            {/* Header */}
  
            <div className="bg-pink-600 text-white px-5 py-4 flex items-center gap-4">
  
              <Link
                href="/dashboard/messages"
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg"
              >
                ← Back
              </Link>
  
              <div>
                <h1 className="font-bold text-xl">
                  {otherUser?.full_name ||
                    "User"}
                </h1>
  
                <p className="text-sm text-pink-100">
                  Matrimony Messages
                </p>
              </div>
  
            </div>
  
            {/* Messages */}
  
            <div className="flex-1 overflow-y-auto bg-gray-100 p-5">
  
              {messages.length ===
                0 && (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Start your
                  conversation 💬
                </div>
              )}
  
              <div className="space-y-3">
  
                {messages.map(
                  (msg) => (
                    <div
                      key={msg.id}
                      className={
                        msg.sender_id ===
                        currentUser.id
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={
                          msg.sender_id ===
                          currentUser.id
                            ? "max-w-[75%] bg-pink-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow"
                            : "max-w-[75%] bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow"
                        }
                      >
                        <div>
                          {
                            msg.message
                          }
                        </div>
  
                        {msg.sender_id ===
                          currentUser.id && (
                          <div className="text-xs mt-1 text-right opacity-80">
                            {msg.is_seen
                              ? "✓✓ Seen"
                              : "✓ Sent"}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
  
              </div>
  
            </div>
  
            <ChatBox
              receiverId={Number(
                id
              )}
            />
  
          </div>
  
        </div>
      );
    } catch (error) {
      console.error(
        "Chat Page Error:",
        error
      );
  
      return (
        <div className="p-10 text-center">
          Something went wrong.
          Please try again later.
        </div>
      );
    }
  }