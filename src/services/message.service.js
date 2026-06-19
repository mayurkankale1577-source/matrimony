import db from "@/lib/db";

export async function sendMessage(
  senderId,
  receiverId,
  message
) {
  try {
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
  } catch (error) {
    console.error(
      "sendMessage Error:",
      error
    );

    return null;
  }
}

export async function getMessages(
  userId,
  otherUserId
) {
  try {
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
  } catch (error) {
    console.error(
      "getMessages Error:",
      error
    );

    return [];
  }
}

export async function getUserById(
  userId
) {
  try {
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

    return rows[0] || null;
  } catch (error) {
    console.error(
      "getUserById Error:",
      error
    );

    return null;
  }
}

export async function markMessagesSeen(
  receiverId,
  senderId
) {
  try {
    await db.query(
      `
      UPDATE messages
      SET is_seen = 1
      WHERE receiver_id = ?
      AND sender_id = ?
      `,
      [
        receiverId,
        senderId,
      ]
    );

    return true;
  } catch (error) {
    console.error(
      "markMessagesSeen Error:",
      error
    );

    return false;
  }
}