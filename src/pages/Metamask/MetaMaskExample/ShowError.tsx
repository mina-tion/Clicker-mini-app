import { Center, Flex } from '@chakra-ui/react';

type Props = {
  error: Error | undefined;
}

export function ShowError({ error }: Props) {
  return (
    <>
      { error && (
        <Flex flexDirection="column">
          <Center maxWidth="200px" wordBreak="break-word">{error.message}</Center>
          <Center maxWidth="200px" wordBreak="break-word">{error.name}</Center>
          <Center maxWidth="200px" wordBreak="break-word">{error.stack}</Center>
        </Flex>
      )}
    </>
  );
}
