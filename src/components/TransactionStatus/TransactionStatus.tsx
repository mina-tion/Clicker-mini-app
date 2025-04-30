import { SwipeableDrawer } from '@components/SwipeableDrawer';
import { Flex, Link, Text, Image } from '@chakra-ui/react';
import { MainButton } from '@components/MainButton';
import { ContentPanel } from '@components/ContentPanel';
import { useMemo } from 'react';
import ExplorerImg from '../../assets/images/icons/explorer.svg';

const transactionStates = {
  TRANSACTION_FAILED: 'RANSACTION_FAILED',
  TRANSACTION_NOT_SEND: 'TRANSACTION_NOT_SEND',
  TRANSACTION_CONFIRMED: 'TRANSACTION_CONFIRMED',
};

interface TransactionStatusProps {
  isOpen: boolean;
  onClose: () => void;
  transactionState: string;
}

export function TransactionStatus({
  isOpen,
  onClose,
  transactionState,
}: TransactionStatusProps) {
  const transactionStatusData = useMemo(
    () => ({
      [transactionStates.TRANSACTION_FAILED]: {
        title: 'Failed transaction',
        titleColor: '#F04438',
        text: 'Claiming 1200 USD has been failed, please try again',
        btnText: 'Try again',
        borderColor: 'red',
        sticker: '❌️️',
      },
      [transactionStates.TRANSACTION_NOT_SEND]: {
        title: 'Failed transaction',
        titleColor: '#F04438',
        text: 'Transaction has not been send to chain, please try again later',
        btnText: 'Try again',
        borderColor: 'red',
        sticker: '❌️️',
      },
      [transactionStates.TRANSACTION_CONFIRMED]: {
        title: 'Connected',
        titleColor: '#A7F67B',
        text: 'Claiming 1200 USD has been completed',
        borderColor: 'green',
        sticker: '✅',
      },
    }),
    [],
  );

  const currentState =
    transactionStatusData[transactionState] ||
    transactionStatusData[transactionStates.TRANSACTION_FAILED];

  return (
    <SwipeableDrawer
      title={currentState.title}
      isOpen={isOpen}
      onClose={onClose}
      titleColor={currentState.titleColor}
    >
      <Flex
        pb='44px'
        justifyContent='flex-start'
        alignItems='center'
        flexDirection='column'
        gap='24px'
        minH='360px'
        w='100%'
        fontFamily='Russo One'
      >
        <Text fontSize='20px' lineHeight='24px'>
          {currentState.sticker}
        </Text>
        <ContentPanel
          sx={{
            justifyContent: 'center !important',
            p: '24px 12px !important',
          }}
          borderColorVariant={currentState.borderColor}
        >
          <Text fontSize='14px' lineHeight='18px' textAlign='center'>
            {currentState.text}
          </Text>
        </ContentPanel>
        <Flex justifyContent='center' flexDirection='row' gap='4px' alignItems='center'>
          <Text
            color='#A7F67B'
            fontFamily='Roboto'
            fontSize='16px'
            fontWeight={700}
            lineHeight='24px'
          >
            {'Explorer'}
          </Text>
          <Link>
            <Image w='12px' src={ExplorerImg} />
          </Link>
        </Flex>

        {currentState.btnText && (
          <MainButton>
            <Text>{currentState.btnText}</Text>
          </MainButton>
        )}
      </Flex>
    </SwipeableDrawer>
  );
}
