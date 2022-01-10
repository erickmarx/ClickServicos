import { AuthConstants } from 'configs/global.constants';
import { scrypt, createCipheriv, Cipher } from 'crypto';

export class HashService {
  async encrypt(rawPassword: string): Promise<string> {
    const { keylength, salt } = AuthConstants;
    return new Promise((resolve, reject) => {
      scrypt(rawPassword, salt, keylength, (err: Error, derivedKey: Buffer) => {
        err ? reject(err) : resolve(this.encryptCallback(derivedKey));
      });
    });
  }

  async decrypt(
    entryPassword: string,
    passwordHashed: string,
  ): Promise<boolean> {
    const decrypt = {
      key: passwordHashed.slice(0, 32),
      salt: passwordHashed.slice(32, 64),
    };
    return await new Promise((resolve, reject) => {
      scrypt(
        entryPassword,
        decrypt.salt,
        AuthConstants.keylength,
        (err: Error, derivedKey: Buffer) => {
          err
            ? reject(err)
            : resolve(this.decryptCallback(derivedKey, decrypt.key));
        },
      );
    });
  }

  private async encryptCallback(derivedKey: Buffer): Promise<string> {
    const cipher: { encrypted: string; hash: Cipher } = {
      encrypted: '',
      hash: null,
    };
    const { salt, algorithm, iv } = AuthConstants;
    cipher.hash = createCipheriv(algorithm, derivedKey, iv)
      .setEncoding('hex')
      .on('data', (chunk) => (cipher.encrypted += chunk));
    cipher.hash.end();
    return cipher.encrypted + salt;
  }

  private async decryptCallback(
    derivedKey: Buffer,
    key: string,
  ): Promise<boolean> {
    const { algorithm, iv } = AuthConstants;
    return await new Promise((resolve) => {
      const unhash = createCipheriv(algorithm, derivedKey, iv)
        .setEncoding('hex')
        .on('data', (chunk) => resolve(chunk == key));
      unhash.end();
    });
  }
}
