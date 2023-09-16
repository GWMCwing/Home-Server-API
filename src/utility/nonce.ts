import { randomBytes } from 'crypto';
import { schedule } from 'node-cron';

type NonceData = Record<string, any> & {
  nonce: string;
  expiration: Date;
};

const NONCE_LENGTH = 32;
const NONCE_EXPIRATION = 1000 * 60 * 5;

const NonceStore: Record<string, NonceData> = {};

function generateNonce(expirationOffset: number = NONCE_EXPIRATION): string {
  const nonceBytes = randomBytes(NONCE_LENGTH);
  const nonce = nonceBytes.toString('hex');
  NonceStore[nonce] = {
    nonce,
    expiration: new Date(Date.now() + expirationOffset),
  };
  return nonce;
}

function validateNonce(nonce: string, validation: (data: NonceData) => boolean = () => true): boolean {
  const data = NonceStore[nonce];
  if (!data) return false;
  if (data.expiration < new Date()) {
    delete NonceStore[nonce];
    return false;
  }
  return validation(data);
}

function revokeNonce(nonce: string): void {
  delete NonceStore[nonce];
}

(() => {
  console.log('NonceStore garbage collection scheduled.');
  schedule('0 0 */2 * *', () => {
    for (const nonce in NonceStore) {
      if (NonceStore[nonce].expiration < new Date()) {
        delete NonceStore[nonce];
      }
    }
  });
})();

export { generateNonce, validateNonce, revokeNonce };
