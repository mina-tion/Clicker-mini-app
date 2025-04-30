import { Address } from 'viem';

// contractName by chainId to contractAddress
export default {
  referralProgram: {
    11155111: '0x7EdE8834A412bDd0b73e53f08d56e46f23389a6B',
    60808: '0x0CAA4aFcce0A53B5f478e84CcBd6cAcA6660b6cA',
  },
} as {
  referralProgram: Record<number, Address>;
};
