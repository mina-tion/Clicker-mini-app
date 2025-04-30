import infoIcon from  '@assets/images/icons/information-circle.svg';
import { Image, ImageProps } from '@chakra-ui/react';

export function InfoIcon({...props}: ImageProps) {
  return (
    <Image w="16px" h="16px" {...props} src={infoIcon} />
  );
}
