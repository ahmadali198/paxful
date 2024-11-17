import crypto from 'crypto';

export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex'); // Generates a secure random token
}
