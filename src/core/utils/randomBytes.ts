import { Buffer } from 'buffer';

/**
 * Generates cryptographically strong random bytes using the Web Crypto API.
 * @param {number} size – The number of random bytes to generate.
 * @returns {Promise<Buffer>} A promise that resolves to a buffer containing random bytes.
 */
export async function randomBytes(size: number): Promise<Buffer> {
  const array = new Uint8Array(size);
  window.crypto.getRandomValues(array);
  return Buffer.from(array.buffer);
}
