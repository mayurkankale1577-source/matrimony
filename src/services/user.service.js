export async function isPremium(userId) {
    const [rows] = await db.query(
      "SELECT is_premium FROM users WHERE id = ?",
      [userId]
    );
  
    return rows[0]?.is_premium === 1;
  }