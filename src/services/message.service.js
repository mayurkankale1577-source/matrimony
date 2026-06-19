import db from "@/lib/db";

export async function sendMessage(
  senderId,
  receiverId,
  message
) {
  const [result] = await db.query(
    `
    INSERT INTO messages
    (
      sender_id,
      receiver_id,
      message
    )
    VALUES (?, ?, ?)
    `,
    [
      senderId,
      receiverId,
      message,
    ]
  );

  return result;
}

export async function getMessages(
  userId,
  otherUserId
) {
  const [rows] = await db.query(
    `
    SELECT *
    FROM messages
    WHERE
      (
        sender_id = ?
        AND receiver_id = ?
      )
      OR
      (
        sender_id = ?
        AND receiver_id = ?
      )
    ORDER BY created_at ASC
    `,
    [
      userId,
      otherUserId,
      otherUserId,
      userId,
    ]
  );

  return rows;
}

export async function getUserById(
    userId
  ) {
    const [rows] = await db.query(
      `
      SELECT
        id,
        full_name
      FROM users
      WHERE id = ?
      `,
      [userId]
    );
  
    return rows[0];
  }



  export async function markMessagesSeen(
    receiverId,
    senderId
  ) {
    await db.query(
      `
      UPDATE messages
      SET is_seen = 1
      WHERE receiver_id = ?
      AND sender_id = ?
      `,
      [receiverId, senderId]
    );
  }