import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "../../lib/mongodb";
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("paxful");
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const cookieValue = `token=${token}; HttpOnly; Max-Age=3600; Path=/; ${
        process.env.NODE_ENV === "production" ? "Secure; " : ""
      }SameSite=Strict`;
      res.setHeader("Set-Cookie", cookieValue);

      return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  return res.status(405).json({ error: "Method Not Allowed" });
}
