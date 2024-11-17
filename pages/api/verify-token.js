import { connectToDatabase } from '../utils/db';  // Replace with your DB connection utility
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ valid: false });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('password_reset_tokens').findOne({ token });

    if (!user || new Date(user.expiryDate) < new Date()) {
      return res.status(400).json({ valid: false });  // Invalid or expired token
    }

    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(500).json({ valid: false });
  }
}
