import { metaMask } from 'wagmi/connectors';
import { MetaMaskParams } from './MetaMaskOptions';

export const metaMaskSDKConnector = metaMask(MetaMaskParams);
