import closeIcon from '@assets/images/icons/close2.svg';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Center,
  Flex,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { Title } from '@components/Title';
import { ReactNode, useRef } from 'react';

interface SwipeableDrawerProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  titleColor?: string;
}

export function SwipeableDrawer({
  title,
  isOpen,
  onClose,
  children,
  titleColor = '#FDFAFF',
}: SwipeableDrawerProps) {
  const startYRef = useRef<number>(0);
  const endYRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    endYRef.current = e.changedTouches[0].clientY;
    if (endYRef.current - startYRef.current > 100) {
      onClose();
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement='bottom' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderRadius='16px'
          borderTop='2px solid #9DE874'
          backgroundColor='#171717'
          color='#FDFAFF'
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Flex p='12px 0px 0px 0px'>
            <IconButton
              aria-label='Close'
              isRound={true}
              sx={{
                ml: 'auto',
                bg: 'transparent',
                _hover: 'none',
                borderColor: 'none',
                border: 'none',
                h: '24px',
                _active: 'none',
              }}
              icon={<Image src={closeIcon} />}
              onClick={onClose}
            />
          </Flex>
          <DrawerHeader>
            <Center>
              <Title
                color={titleColor}
                variant='extra-medium'
                textAlign='center'
                fontSize='20px'
              >
                {title}
              </Title>
            </Center>
          </DrawerHeader>
          <DrawerBody p='0 24px'>
            <Center flexDirection='column' gap='20px'>
              {children}
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
