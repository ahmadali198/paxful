import { prisma } from '../../lib/prisma'; // Prisma client for database
import { hashPassword } from '../../utils/password'; // Utility to hash passwords

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, code, password } = req.body;

    try {
      // Find the password reset record by email and code
      const passwordReset = await prisma.passwordReset.findFirst({
        where: {
          email,
          code,
          expiresAt: { gt: new Date() }, // Ensure the code is not expired
        },
      });

      if (!passwordReset) {
        return res.status(400).json({ success: false, message: 'Invalid or expired recovery code' });
      }

      // Hash the new password
      const hashedPassword = await hashPassword(password);

      // Update the user's password
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      // Delete the recovery code after successful password reset
      await prisma.passwordReset.delete({ where: { id: passwordReset.id } });

      return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error during password reset:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
