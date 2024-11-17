// pages/api/logout.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Clear the token cookie by setting it with an expired date
      res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
  
      // Respond with success message
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  
    // If the method is not POST, return a 405 error
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  