import { formatEther, Hex, hexToBigInt, hexToNumber } from 'viem';

export function formatEtherFromHex(hex: string) {
  return formatEther(hexToBigInt(hex as unknown as Hex));
}

export function formatNumberFromHex(hex: string) {
  return hexToNumber(hex as unknown as Hex);
}
