// pages/api/register.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import clientPromise from '../../lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("paxful"); 
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    const token = jwt.sign({ userId: result.insertedId, email: newUser.email });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}SameSite=Strict`);

    return res.status(201).json({ message: 'Registration successful' });
    
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
