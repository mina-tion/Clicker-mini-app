import earnIcon from '@assets/images/icons/coins-stack.svg';
import gameIcon from '@assets/images/icons/game.svg';
import referralsIcon from '@assets/images/icons/referrals.svg';
import { Flex } from '@chakra-ui/react';
import { NavLink } from '@components/NavLink';
import { ROUTER_LINKS } from '@core/constants/RouterLinks';
import { useLocation } from 'react-router-dom';

export function NavBar() {
  const location = useLocation();

  function isActiveLink(link: string) {
    return location.pathname === link;
  }

  return (
    <Flex>
      <NavLink isActive={isActiveLink(ROUTER_LINKS.GAME)} icon={gameIcon} link={ROUTER_LINKS.GAME} text="Game" />
      <NavLink isActive={isActiveLink(ROUTER_LINKS.REFERRALS)} icon={referralsIcon} link={ROUTER_LINKS.REFERRALS} text="Referrals"/>
      <NavLink isActive={isActiveLink(ROUTER_LINKS.EARN)} icon={earnIcon} link={ROUTER_LINKS.EARN} text="Earn"/>
    </Flex>
  );
}
