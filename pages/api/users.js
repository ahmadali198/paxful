// pages/api/users.js
import dbConnect from '@/pages/utils/db';
import User from '@/lib/models/User'; // Assume you have a User model

export default async function handler(req, res) {
  await dbConnect();

  // Sample logic to get all users
  const users = await User.find({});
  res.status(200).json({ users });
}
