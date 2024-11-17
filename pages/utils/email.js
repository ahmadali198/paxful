import nodemailer from 'nodemailer';

export async function sendResetEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,   // Store your email in an environment variable
      pass: process.env.EMAIL_PASS,   // Store your App Password in an environment variable
    },
  });

  const resetUrl = `http://localhost:3000/reset-password/${token}`;


  const mailOptions = {
    from: process.env.EMAIL_USER,    // Use the environment variable here too
    to: email,
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
