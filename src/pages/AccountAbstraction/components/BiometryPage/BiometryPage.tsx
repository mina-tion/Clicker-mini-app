import { Box, Button, Center, Flex, Input, Spinner, Textarea } from '@chakra-ui/react';
import { BiometryManager, initBiometryManager } from '@telegram-apps/sdk';
import { useEffect, useState } from 'react';

export const BiometryPage = () => {
  const [token, setToken] = useState('');
  const [credential, setCredential] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [bm, setBiometricManager] = useState<BiometryManager | undefined>(undefined);

  useEffect(() => {
    async function initBiometricManager(biometryManager: Promise<BiometryManager>) {
      const bm = await biometryManager;
      setBiometricManager(bm);
    }  

    try {
      const [biometryManager] = initBiometryManager();    

      initBiometricManager(biometryManager);
    } catch (e) {
      setError(e as Error);
      console.error('[BIOMETRIC:INIT] ', e);
    }     
  }, []);

  function openBiometricSettings() {
    try {
      bm?.openSettings();
    } catch (e) {
      setError(e as Error);
      console.error('[BIOMETRIC:SETTINGS] ', e);
    }
  }

  async function requestBiometricAccess() {
    try {
      await bm?.requestAccess({ reason: 'Authorize to start using biometry' });
    } catch (e) {
      setError(e as Error);
      console.error('[BIOMETRIC:REQUEST:ACCESS] ', e);
    }
  }

  async function saveTokenToTWA(token: string) {
    setIsLoading(true);
    try {
      await bm?.updateToken({ token });
      setToken('');
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (e) {
      setError(e as Error);
      console.error('[BIOMETRIC:SAVE:TOKEN] ', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function getTokenFromTWA() {
    setIsLoading(true);
    try {
      const token = await bm?.authenticate({ reason: 'Authorize to unlock the storage' })
      setCredential(token);
    } catch (e) {
      setError(e as Error);
      console.error('[BIOMETRIC:GET:TOKEN] ', e);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
      <Center paddingBottom="20px">Biometric Manager</Center>
      <Box maxWidth="200px" wordBreak="break-word">Device Id : {bm?.deviceId}</Box>
      <Box maxWidth="200px" wordBreak="break-word">bm : {bm ? 'exist' : 'null'}</Box>
      <Center gap="10px">
        { isLoading && <Spinner /> }
        { error && (
          <Flex flexDirection="column">
            <Center maxWidth="200px" wordBreak="break-word">{error.message}</Center>
            <Center maxWidth="200px" wordBreak="break-word">{error.name}</Center>
            <Center maxWidth="200px" wordBreak="break-word">{error.stack}</Center>
          </Flex>
        )}
        { (bm &&!isLoading && !error) &&
          (
            <Flex flexDirection="column" gap="20px">
              <Flex>
                { (bm && !bm.accessGranted) && (
                    <Button onClick={() => {
                      requestBiometricAccess();
                    }}>Request access</Button>
                  )
                }
              </Flex>              
              <Flex>
                <Button onClick={() => {
                  openBiometricSettings();
                }}>Settings</Button>
              </Flex>
              <Flex gap="10px">
                <Input placeholder='Type token' value={token} onChange={(e) => setToken(e.target.value)} />
                <Button onClick={() => {
                  saveTokenToTWA(token);
                }}>Save</Button>
              </Flex>
              { isSaved && (<Flex>Token saved</Flex>)}
              <Flex gap="10px">
                <Button onClick={() => {
                  getTokenFromTWA();
                }}>Get</Button>
                <Textarea value={credential} />
              </Flex>
            </Flex>
          )
        }
      </Center>
    </>
  );
};
