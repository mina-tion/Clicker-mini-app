import { MetaMaskSDKOptions } from '@metamask/sdk';
import { MetaMaskParameters } from 'wagmi/connectors';

const options: MetaMaskParameters | MetaMaskSDKOptions = {
  logging: {
    developerMode: false,
  },
  communicationServerUrl: import.meta.env
    .VITE_METAMASK_COMMUNICATION_SERVER_URL,
  checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
  dappMetadata: {
    name: 'Telegram MiniApp',
    url: window.location.protocol + '//' + window.location.host,
  },
};

export const MetaMaskSDKParams: MetaMaskSDKOptions = {
  ...(options as MetaMaskSDKOptions),
};

export const MetaMaskParams: MetaMaskParameters = {
  ...options,
};
