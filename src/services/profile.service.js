import db from "@/lib/db";

export async function getProfiles() {
  try {
    const [rows] = await db.query(`
      SELECT
        users.id,
        users.full_name,
        users.gender,
        profiles.birth_place,
        profiles.education,
        profiles.occupation,
        photos.image_url
      FROM users
      INNER JOIN profiles
        ON users.id = profiles.user_id
      LEFT JOIN photos
        ON users.id = photos.user_id
        AND photos.is_primary = 1
      ORDER BY users.id DESC
    `);

    return rows;
  } catch (error) {
    console.error(
      "getProfiles Error:",
      error
    );

    return [];
  }
}

export async function getProfileById(
  id
) {
  try {
    const [rows] =
      await db.query(
        `
        SELECT
          users.id,
          users.full_name,
          users.gender,
          profiles.religion,
          profiles.education,
          profiles.occupation,
          profiles.about_me,
          profiles.height,
          profiles.annual_income,
          profiles.partner_preference,
          photos.image_url

        FROM users

        LEFT JOIN profiles
          ON users.id = profiles.user_id

        LEFT JOIN photos
          ON users.id = photos.user_id

        WHERE users.id = ?
        `,
        [id]
      );

    return rows[0] || null;
  } catch (error) {
    console.error(
      "getProfileById Error:",
      error
    );

    return null;
  }
}



export async function getInterestedInMe(
  userId
) {
  try {
    const [rows] = await db.query(
      `
      SELECT
        users.id,
        users.full_name,
        photos.image_url

      FROM likes

      INNER JOIN users
        ON likes.from_user_id = users.id

      LEFT JOIN profiles
        ON users.id = profiles.user_id

      LEFT JOIN photos
        ON users.id = photos.user_id
        AND photos.is_primary = 1

      WHERE likes.to_user_id = ?
      `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error(
      "getInterestedInMe Error:",
      error
    );

    return [];
  }
}

export async function getLikedProfileIds(
  userId
) {
  try {
    const [rows] =
      await db.query(
        `
        SELECT to_user_id
        FROM likes
        WHERE from_user_id = ?
        `,
        [userId]
      );

    return rows.map(
      (row) => row.to_user_id
    );
  } catch (error) {
    console.error(
      "getLikedProfileIds Error:",
      error
    );

    return [];
  }
}