import { sendResetEmail } from '../../utils/email'; // Utility to send email
import { prisma } from '../../lib/prisma'; // Prisma client for database

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Generate a recovery code (6-digit numeric code for simplicity)
      const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store the recovery code and its expiration in the database
      await prisma.passwordReset.upsert({
        where: { userId: user.id },
        update: {
          code: recoveryCode,
          expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
        },
        create: {
          userId: user.id,
          code: recoveryCode,
          expiresAt: new Date(Date.now() + 3600000), // Expires in 1 hour
        },
      });

      // Send the recovery code via email
      await sendResetEmail(email, recoveryCode);

      return res.status(200).json({ success: true, message: 'Recovery code sent successfully' });
    } catch (error) {
      console.error('Error during password reset request:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
