import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    if (!token) {
      return null;
    }

    return jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch (error) {
    console.error(
      "JWT Verify Error:",
      error.message
    );

    return null;
  }
}