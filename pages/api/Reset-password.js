app.post('/api/reset-password', async (req, res) => {
  const { email, recoveryCode, newPassword } = req.body;

  if (!email || !recoveryCode || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Find the user and validate the recovery code
    const user = await User.findOne({ email });

    if (!user || user.recoveryCode !== recoveryCode) {
      return res.status(400).json({ error: 'Invalid recovery code or email' });
    }

    // Update the user's password
    user.password = await hashPassword(newPassword); // Ensure you hash the password
    user.recoveryCode = null; // Clear the recovery code after use
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});
