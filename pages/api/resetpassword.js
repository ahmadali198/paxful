import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs"; // Optional: to hash the new password

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end(); // Only POST requests allowed

  const { email, newPassword, recoveryToken } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("paxful");

    // Find user by email and recovery token
    const user = await db.collection("users").findOne({ email, recoveryToken });

    if (!user) {
      return res.status(400).json({ error: "Invalid recovery token or email." });
    }

    // Hash the new password before storing it (optional)
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password and remove the recoveryToken (security measure)
    const result = await db.collection("users").updateOne(
      { email },
      { 
        $set: { password: hashedPassword },
        $unset: { recoveryToken: "" } // Optionally remove recovery token after use
      }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: "Password reset successfully." });
    } else {
      return res.status(400).json({ error: "Failed to reset password." });
    }
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
