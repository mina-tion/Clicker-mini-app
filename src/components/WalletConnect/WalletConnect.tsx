import { SwipeableDrawer } from '@components/SwipeableDrawer';
import { Flex, Text } from '@chakra-ui/react';
import { MainButton } from '@components/MainButton';
import { ContentPanel } from '@components/ContentPanel';
import { useMemo } from 'react';

const walletStates = {
  NO_WALLET: 'NO_WALLET',
  WALLET_NOT_CONNECTED: 'WALLET_NOT_CONNECTED',
  CONNECTION_IN_PROGRESS: 'CONNECTION_IN_PROGRESS',
  CONNECTED_WRONG_WALLET: 'CONNECTED_WRONG_WALLET',
  CANCELED_CONNECTION: 'CANCELED_CONNECTION',
  WALLET_ALREADY_EXISTS: 'WALLET_ALREADY_EXISTS',
  WALLET_CONNECTED: 'WALLET_CONNECTED',
};

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
  walletState: string;
}

export function WalletConnect({
  isOpen,
  onClose,
  walletState,
}: WalletConnectProps) {
  const walletStateData = useMemo(
    () => ({
      [walletStates.NO_WALLET]: {
        title: 'No wallet detected',
        titleColor: '#FDFAFF',
        text: 'Link your wallet, please',
        btnText: 'Link wallet',
        sticker: '🔥',
      },
      [walletStates.WALLET_NOT_CONNECTED]: {
        title: 'Connecting...',
        titleColor: '#FDFAFF',
        text: 'Connect your wallet, please',
        btnText: 'Connect wallet',
        sticker: '⌛️',
      },
      [walletStates.CONNECTION_IN_PROGRESS]: {
        title: 'Connecting...',
        titleColor: '#FDFAFF',
        text: 'Connection in progress',
        sticker: '⌛️',
      },
      [walletStates.CONNECTED_WRONG_WALLET]: {
        title: 'Connection error',
        titleColor: '#F04438',
        text: 'Please connect linked wallet: 0x87...456k',
        sticker: '❌️️',
      },
      [walletStates.CANCELED_CONNECTION]: {
        title: 'Connection error',
        titleColor: '#F04438',
        text: 'You canceled your wallet connection',
        btnText: 'Try again',
        sticker: '❌️️',
      },
      [walletStates.WALLET_ALREADY_EXISTS]: {
        title: 'Connection error',
        titleColor: '#F04438',
        text: 'This wallet 0x87...456k is linked to other account',
        btnText: 'Try again',
        sticker: '❌️️',
      },
      [walletStates.WALLET_CONNECTED]: {
        title: 'Connected',
        titleColor: '#A7F67B',
        text: 'You have successfully conneted your wallet!',
        sticker: '✅',
      },
    }),
    [],
  );

  const currentState =
    walletStateData[walletState] ||
    walletStateData[walletStates.WALLET_ALREADY_EXISTS];

  return (
    <SwipeableDrawer
      title={currentState.title}
      isOpen={isOpen}
      onClose={onClose}
      titleColor={currentState.titleColor}
    >
      <Flex
        justifyContent='flex-start'
        alignItems='center'
        flexDirection='column'
        gap='24px'
        minH='360px'
        w='100%'
      >
        <Text fontSize='20px' lineHeight='24px'>
          {currentState.sticker}
        </Text>
        <ContentPanel
          sx={{
            justifyContent: 'center !important',
            p: '24px 12px !important',
          }}
        >
          <Text
            fontFamily='Russo One'
            fontSize='14px'
            lineHeight='18px'
            textAlign='center'
          >
            {currentState.text}
          </Text>
        </ContentPanel>
        {currentState.btnText && (
          <MainButton>
            <Text>{currentState.btnText}</Text>
          </MainButton>
        )}
      </Flex>
    </SwipeableDrawer>
  );
}
