// pages/api/login.js
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
// Dummy user data
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', // Plaintext password for demo purposes only
  },
];

// Define a secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if the email and password fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      // If user is not found, return an error
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token if authentication is successful
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; ${process.env.NODE_ENV === 'production' ? 'Secure; ' : ''}SameSite=Strict`);

    return res.status(200).json({ message: 'Login successful', token });
    
  }

  // If the method is not POST, return a 405 error
  return res.status(405).json({ error: 'Method Not Allowed' });
}
