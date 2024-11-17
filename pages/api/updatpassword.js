// pages/api/updatepassword.js
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Use your MongoDB URI
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, recoveryCode } = req.body;

  if (!email || !password || !recoveryCode) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await client.connect();
    const db = client.db("yourDatabaseName");
    const usersCollection = db.collection("users");

    // Verify the recovery code
    const user = await usersCollection.findOne({ email });
    if (!user || user.recoveryCode !== recoveryCode) {
      return res.status(400).json({ error: "Invalid recovery code or email." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database
    const result = await usersCollection.updateOne(
      { email },
      { $set: { password: hashedPassword, recoveryCode: null } } // Clear recovery code
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "Failed to update password." });
    }

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
