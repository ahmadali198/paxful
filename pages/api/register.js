// pages/api/register.js
import jwt from 'jsonwebtoken';

// Dummy user database (for demo purposes)
const users = [];

// Define a secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create new user and add to "database"
    const newUser = {
      id: users.length + 1,
      email,
      password, // In a real application, hash the password here
    };
    users.push(newUser);

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set the JWT token in an HTTP-only cookie manually
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}SameSite=Strict`);

    // Return success message
    return res.status(201).json({ message: 'Registration successful' });
  }

  // If the method is not POST, return a 405 error
  return res.status(405).json({ error: 'Method Not Allowed' });
}
