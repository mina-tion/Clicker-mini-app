import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { Heading } from '@components/Heading';
import { Label } from '@components/Label';
import { Title } from '@components/Title';
import { ROUTER_LINKS } from '@core/constants/RouterLinks';
import { RequestStatuses } from '@core/constants/Statuses.ts';
import useReferralLink from '@core/hooks/useReferralLink.ts';
import { useTelegramAuth } from '@core/hooks/useTelegramAuth.ts';
import { useTelegramBackButtonTo } from '@core/hooks/useTelegramBackButton';
import { storeMobx } from '@core/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { YourAchievements } from './components/YourAchievements';
import { YourFriends } from './components/YourFriends';

export const Referrals = observer(() => {
  const { referrals, authorization } = storeMobx;
  const { isUserAuthorized } = useTelegramAuth(storeMobx);
  const { refLink, openRefLink } = useReferralLink();

  useTelegramBackButtonTo(storeMobx, ROUTER_LINKS.GAME);

  useEffect(() => {
    if (isUserAuthorized) {
      referrals.getList();
    }
  }, [referrals, isUserAuthorized]);

  return (<>
    {isUserAuthorized && (<Flex sx={{
      pt: '20px',
      mb: '10px',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '20px',
    }}>
      <Heading variant="primary" as="h2" p="10px 0px;" color="#FDFAFF" textAlign="center">
        Invite friends and get 50% of each friend's G-points
      </Heading>
      <YourAchievements friendsAmount={(referrals.list || []).length}/>
      <YourFriends list={referrals.list || []}/>
      <Box
        sx={{
          w: '100%',
          p: '0px 20px',
          position: 'fixed',
          bottom: '90px',
          left: '0px',
        }}>
        <Button
          colorScheme="green"
          onClick={() => {
            if (refLink) {
              openRefLink();
            }
          }}
          sx={{
            w: '100%',
            borderRadius: '40px',
            '&:hover': {
              bg: '#89CB64'
            }
          }}
        >
          <Label variant="button" color="background.900">Invite friends</Label>
        </Button>
      </Box>
    </Flex>)}
    {!isUserAuthorized && authorization.authStatus === RequestStatuses.REJECTED && (<Center>
      <Title variant='extra-medium' textAlign='center'>This page is not available now. An authentication error has occurred</Title>
    </Center>)}
    {!isUserAuthorized && authorization.authStatus === RequestStatuses.LOADING && (<Center>
      <Title variant='extra-medium' textAlign='center'>Loading...</Title>
    </Center>)}
  </>
  );
});
