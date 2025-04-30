import { Flex } from '@chakra-ui/react';
import { ROUTER_LINKS } from '@core/constants/RouterLinks';
import { useTelegramBackButtonTo } from '@core/hooks/useTelegramBackButton';
import { storeMobx } from '@core/store/store';
import { observer } from 'mobx-react-lite';
import { EarnTitle } from './components/EarnTitle/EarnTitle';
import { Guides } from './components/Guides';

export const Earn = observer(() => {
  useTelegramBackButtonTo(storeMobx, ROUTER_LINKS.GAME);

  return (
    <Flex sx={{
      pt: '40px',
      mb: '5px',
      w: '100%',
      flexDirection: 'column',
      alignItems:  'center',
      flexShrink: 0,
      gap: '40px'
    }}>
      <EarnTitle />
      <Guides />
    </Flex>
  );
});
