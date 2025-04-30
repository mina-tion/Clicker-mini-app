import friendsIcon from '@assets/images/icons/friends.svg';
import { Flex, Image } from '@chakra-ui/react';
import { ContentPanel } from '@components/ContentPanel';
import { Heading } from '@components/Heading';
import { Title } from '@components/Title';
import {
  ReferralsListResponse
} from '@core/types/response/referrals/ReferralsListResponse.ts';
import { Friend } from './components/Friend';

interface FriendsProps {
  list: ReferralsListResponse;
}

export const YourFriends = ({ list }: FriendsProps) => {
  return (
    <Flex sx={{
      w: '100%',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
    }}>
      <Heading variant="medium">Your Friends</Heading>
      {!!list.length && (
        <Flex as="ul"
           sx={{
             w: '100%',
             flexDirection: 'column',
             alignItems: 'flex-start',
             gap: '12px'
           }}
        >
          {list.map((friend, idx) => (
            <Friend as="li"
              key={idx}
              index={idx+1}
              nickname={friend.username}
            />
          ))}
      </Flex>)}
      {!list.length && (
        <ContentPanel
          sx={{
            w: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            paddingBottom: '0px',
          }}
        >
          <Title
            variant="custom"
            sx={{
              w: '100%',
              fontSize: '14px',
              fontHeight: '20px',
              textAlign: 'center',
            }}
          >
            You don’t have any referral friends yet.
          </Title>
          <Title
            variant="custom"
            sx={{
              fontSize: '14px',
              fontHeight: '20px',
              textAlign: 'center',
            }}
          >
            Invite friends using your link and get a bonus — 50% for every point
            they earn! Yes, you'll earn 50% of the G-points your friends
            receive. This system is endless!
          </Title>
          <Image
            src={friendsIcon}
            alt='referrals'
          />
        </ContentPanel>)}
    </Flex>
  );
};

