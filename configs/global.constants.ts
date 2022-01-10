import { randomBytes } from 'crypto';

export const AuthConstants = {
  salt: randomBytes(16).toString('hex'),
  algorithm: 'aes-256-cbc',
  iv: new Uint8Array(16),
  keylength: 32,
};
