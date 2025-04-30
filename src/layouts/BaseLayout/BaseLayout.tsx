import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { MetamaskNavLink } from '@components/MetamaskNavLink';
import { NavBar } from '@components/NavBar';
import { WalletNavLink } from '@components/WalletNavLink';
import { FEATURE_TOGGLES } from '@core/feature-toggles';
import { Outlet } from 'react-router-dom';

const navBarH = (
  FEATURE_TOGGLES.METAMASK.ENABLED ||
  FEATURE_TOGGLES.ACCOUNT_ABSTRACTION.ENABLED
) ? '120px' : '68px';

const navStyles: BoxProps = {
  w: '100%',
  minH: navBarH,
  maxH: navBarH,
  zIndex: 50,
  position: 'fixed',
  bottom: '0',

  borderTop: '1px solid #636363',
  overflow: 'hidden',

  bg: 'background.900',
  color: 'white'
};

export function BaseLayout() {
  return (
    <Box w="100vw" h='100%' p="0" bg='background.900' color='white'>
      <Flex h="100%" direction="column">
        <Flex h="100%" justifyContent="center" p={`0 20px ${navBarH} 20px`}>
          <Outlet />
        </Flex>
        <Box {...navStyles}>
          <NavBar />
          <Flex gap="10px">
            <MetamaskNavLink />
            <WalletNavLink />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
