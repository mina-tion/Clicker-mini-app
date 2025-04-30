import { Button, Center, Flex, Input, Spinner } from '@chakra-ui/react';
import { WebAuthn } from '@core/helpers/web-authn';
import { CreateCredential } from '@core/types/WebAuthn';
import { useState } from 'react';

export const WebAuthnPage = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [credential, setCredential] = useState<CreateCredential | undefined | null | string>(undefined);
  const [otherCredential, setOtherCredential] = useState<Credential | undefined | null>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  async function createWallet(username: string) {
    setIsLoading(true);
    try {
      const webAuthnCredential = await WebAuthn.create({ username });

      if (!webAuthnCredential) {
        return;
      }

      setCredential(webAuthnCredential);
    } catch (e) {
      setError(e as Error);
      console.error('[CREATE:WALLET:ERROR] ', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCredential() {
    setIsLoading(true);
    try {
      const credential = await WebAuthn.getFederatedCredential();

      if (!credential) {
        return;
      }

      setOtherCredential(credential);
    } catch (e) {
      setError(e as Error);
      console.error('[CREATE:WALLET:ERROR] ', e);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
      <Center maxWidth="200px" wordBreak="break-word">navigator.credentials : {navigator.credentials ? 'true' : 'false'}</Center>
      <Center maxWidth="200px" wordBreak="break-word">PasswordCredential : {(window as unknown as { 'PasswordCredential': unknown })['PasswordCredential'] ? 'true' : 'false'}</Center>
      <Center maxWidth="200px" wordBreak="break-word">FederatedCredential : {(window as unknown as { 'FederatedCredential': unknown })['FederatedCredential'] ? 'true' : 'false'}</Center>
      <Center maxWidth="200px" wordBreak="break-word">PublicKeyCredential : {window?.PublicKeyCredential ? 'true' : 'false'}</Center>
      <Center maxWidth="200px" wordBreak="break-word">IdentityCredential : {(window as unknown as { 'IdentityCredential': unknown })['IdentityCredential'] ? 'true' : 'false'}</Center>
      
      <Center gap="10px">
        { error && (
          <Flex flexDirection="column">
            <Center maxWidth="200px" wordBreak="break-word">{error.message}</Center>
            <Center maxWidth="200px" wordBreak="break-word">{error.name}</Center>
            <Center maxWidth="200px" wordBreak="break-word">{error.stack}</Center>
          </Flex>
        )}
        { credential && (
          <Flex flexDirection="column" gap="5px">
            <Flex>Credential (public key) : </Flex>
            <Center maxWidth="300px" wordBreak="break-word">{JSON.stringify(credential)}</Center>
          </Flex>  
        )}
        { otherCredential && (
          <Flex flexDirection="column">
            <Flex>other Credential : </Flex>
            <Center maxWidth="200px" wordBreak="break-word">{JSON.stringify(otherCredential)}</Center>
          </Flex>
        )}        
        { isLoading && <Spinner /> }
        { (!isLoading && !credential && !error) &&
          (
            <Flex flexDirection="column" gap="20px">
              <Flex gap="10px">
                <Input placeholder='Wallet name' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Button onClick={() => {
                  if (username) {
                    createWallet(username);
                  }
                }}>Create</Button>
              </Flex>
              <Flex>
                <Button onClick={() => {
                  getCredential();
                }}>Get</Button>
              </Flex>
            </Flex>
          )
        }
      </Center>
    </>
  );
};
