import { Box, LinkBox, Link as ChakraLink, Image, BoxProps } from '@chakra-ui/react';
import { TextBody } from '@components/TextBoby';
import { storeMobx } from '@core/store/store';
import { ReactNode } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

type Props = {
  icon: string;
  link: string;
  text: string;
  isActive?: boolean
  isExternal?: boolean;
}

type LinkProps = { children: ReactNode }

const activeBackground = 'rgba(255, 255, 255, 0.05)';

export function NavLink({ icon, link, text, isActive = false, isExternal = false }: Props) {
  const { telegram } = storeMobx;
  let Link = ({ children }: LinkProps) => (<>{children}</>);

  function handleClick() {
    telegram.hapticFeedback('soft');
  }

  const styles: BoxProps | LinkProps = {
    p: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '12px',
    _hover: {
      background: activeBackground,
      color: 'white'
    }
  };

  if (isActive) {
    styles.background = activeBackground;
  }

  // External Link
  if (isExternal) {
    Link = ({ children }: LinkProps) => (
      <LinkBox className="prevent-select" as="a" href={link} target="_blank" {...styles as BoxProps} onTouchEnd={handleClick}>
        {children}
      </LinkBox>
    );
  }
  
  // Router Link
  if (!isExternal) {
    Link = ({ children }: LinkProps) => (
      <ChakraLink className="prevent-select" as={ReactRouterLink} to={link} {...styles as LinkProps} onTouchEnd={handleClick}>
        { children}
      </ChakraLink>
    );    
  }  

  return (
    <Box w="100%" h="100%" p="10px 12px"> 
      <Link>
        <Image w="24px" h="24px" src={icon} alt='' />
        <Box p="0px 8px">
          <TextBody variant="small" >{text}</TextBody>
        </Box>
      </Link>
    </Box>
  );
}
