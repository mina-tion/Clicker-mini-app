import nextIcon from '@assets/images/icons/next.svg';
import { Flex, Image } from '@chakra-ui/react';
import { ContentPanel } from '@components/ContentPanel';
import { Title } from '@components/Title';

type Props = {
  iconSrc: string;
  reward: string;
  partner: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const Guide = ({ iconSrc, reward, partner, handleClick }: Props) => {
  return (
    <ContentPanel borderColorVariant="none" 
      sx={{
        gap: '12px',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'gray.600',
        bg: 'linear-gradient(137deg, rgba(23, 23, 23, 0.50) 11.14%, rgba(50, 48, 48, 0.50) 84.99%)',
        backdropFilter: 'blur(15px)',
        _hover: {
          borderColor: '#89CB64',
          bg: 'linear-gradient(137deg, rgba(23, 23, 23, 0.50) 11.14%, rgba(50, 48, 48, 0.50) 84.99%)'
        },
        _active: {
          borderColor: '#89CB64',
          bg: 'linear-gradient(93deg, #1C1C1C 0%, rgba(69, 69, 69, 0.42) 41.57%, rgba(195, 195, 195, 0.00) 104.66%)'
        }
      }}
      role="button"
      onClick={(event) => handleClick(event)}
    >
      <Image w="68px" h="68px" borderRadius='50%' src={iconSrc} />
      <Flex sx={{
        flex: '1 0 0',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px'
      }}>
        <Flex sx={{
          alignItems: 'flex-start',
          gap: '8px'
        }}>
          <Title variant="medium">{`Earn: ${reward}`}</Title>
        </Flex>
        <Title variant="medium" color="gray.400">{`@${partner}`}</Title>
      </Flex>
      <Image ml="auto" w="16px" h="16px" src={nextIcon} alt="next" />
    </ContentPanel>
  );
};
