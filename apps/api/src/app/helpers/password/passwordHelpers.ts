import bcrypt from 'bcrypt';

const rounds = 10;

export const hashPassword = (rawPassword: string) =>
  bcrypt.hash(rawPassword, rounds);

export const passwordMatchesHash = (rawPassword: string, hash: string) =>
  bcrypt.compare(rawPassword, hash);
