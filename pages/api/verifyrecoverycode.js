import { db } from '../../lib/mongodb'; // Import the database connection (assuming you have this)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, recoveryCode } = req.body; // Get email and recovery code from the request body

  if (!email || !recoveryCode) {
    return res.status(400).json({ message: 'Email and recovery code are required' });
  }

  try {
    // Query the database for the user based on the email
    const [user] = await db.query('SELECT * FROM email WHERE email = ?', [email]);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the recovery code matches the stored one
    if (user.recovery_code !== recoveryCode) {
      return res.status(400).json({ message: 'Invalid recovery code' });
    }

    // Optionally check for expiry (if you're using a timestamp for expiry)
    // If you're not using expiry, this part can be skipped
    // if (user.recovery_code_expiry && new Date(user.recovery_code_expiry) < new Date()) {
    //   return res.status(400).json({ message: 'Recovery code has expired' });
    // }

    // If the code is valid, proceed with password reset (if applicable)
    // You could proceed to allow the user to reset their password here.

    return res.status(200).json({ message: 'Recovery code verified successfully' });
  } catch (error) {
    console.error('Error verifying recovery code:', error);
    return res.status(500).json({ message: 'Failed to verify recovery code', error: error.message });
  }
}
