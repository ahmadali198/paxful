import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const recoveryCode = Math.floor(100000 + Math.random() * 900000);

  try {
    const hashedCode = await bcrypt.hash(recoveryCode.toString(), 10);
    // Save the hashed recovery code and email to your database
    // Example pseudo-code:
    // await saveToDatabase(email, hashedCode);

    await transporter.sendMail({
      from: `"Alphasolution" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Password Recovery Code',
      html: `<p>Your password recovery code is: <strong>${recoveryCode}</strong></p>`,
    });

    res.status(200).json({ message: 'Recovery code sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send recovery code. Please try again later.' });
  }
}
