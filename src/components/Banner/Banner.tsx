import closeIcon from '@assets/images/icons/close.svg';
import { Flex, FlexProps, Image, IconButton, Button } from '@chakra-ui/react';
import { Label } from '@components/Label';
import { MainButton } from '@components/MainButton';

type Props = {
  imageSrc: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  handleApply: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Banner = ({ imageSrc, title, subtitle, buttonText, handleApply, handleClose, sx, ...styled }: Props & FlexProps) => {
  return (
    <Flex sx={{
      position: 'relative',
      justifyContent: 'center',
      ...sx
    }}
    {...styled}
    >
      <Flex sx={{
        w: '100%',
        h: '100%',
        gap: '20px',
        borderRadius: '16px',
        backgroundSize:  'cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <Button variant='link' onClick={handleApply} sx={{w: '100%'}}>
          <Image
            borderRadius='16px'
            src={imageSrc}
            alt='banner'
          />
          <Flex sx={{
            w: '80%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '12px',
            position: 'relative'
          }}>
            <Flex sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              alignSelf:'stretch',
            }}>
              {title && (<Label variant="text"
                sx={{
                  w: '100%',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
                title={title}
              >{title}</Label>)}
              {subtitle && (<Label variant="subheadline"
                 sx={{
                   w: '100%',
                   whiteSpace: 'nowrap',
                   textOverflow: 'ellipsis',
                   overflow: 'hidden',
                   opacity: '0.8'
                 }}
                 title={subtitle}>{subtitle}
              </Label>)
              }
            </Flex>
            {buttonText && (
              <MainButton
                sx={{
                  w: '86px',
                  p: '8px 12px',
                  borderRadius: '20px',
                  zIndex: 10,
                  '&:hover': {
                    bg: '#89CB64'
                  }
                }}
                onClick={handleApply}
              >
                <Label variant="subheadline" color="background.900">{buttonText}</Label>
              </MainButton>
            )}
          </Flex>
        </Button>
        <IconButton aria-label='Close' position="absolute" variant='outline' isRound={true}
          sx={{
            ml: 'auto',
            minWidth: '28px',
            minHeight: '28px',
            w: '28px',
            h: '28px',
            border: 'none',
            right: '0px',
            zIndex: '10',
            bg: 'none'
          }}
          icon={<Image src={closeIcon} />}
          onClick={handleClose}
        />
      </Flex>
    </Flex>
  );
};
