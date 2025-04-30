import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { BiometryPage } from './components/BiometryPage';
import { WebAuthnPage } from './components/WebAuthnPage';

type View = 'web-authn' | 'biometric';

export const AccountAbstraction = () => {
  const [view, setView] = useState<View>('web-authn');  
  return (
    <Flex flexDirection="column" gap="40px">
      <Flex gap="10px">
        <Button onClick={() => setView('web-authn')}>WebAuthn</Button>
        <Button onClick={() => setView('biometric')}>Biometric</Button>
      </Flex>
      <Flex sx={{
        padding: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}>
        { view === 'web-authn' && <WebAuthnPage />}
        { view === 'biometric' && <BiometryPage />}
      </Flex> 
   </Flex> 
  );
};
