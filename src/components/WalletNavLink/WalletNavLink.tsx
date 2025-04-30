import { Button, Center } from '@chakra-ui/react';
import { ROUTER_LINKS } from '@core/constants/RouterLinks';
import { FEATURE_TOGGLES } from '@core/feature-toggles';
import { NavLink } from 'react-router-dom';

export function WalletNavLink() {
  return (
    <>
      { FEATURE_TOGGLES.ACCOUNT_ABSTRACTION.ENABLED && (
        <Center>
          <NavLink to={ROUTER_LINKS.ACCOUNT_ABSTRACTION}>
            <Button>Wallet</Button>
          </NavLink>
        </Center>
        )
      }
    </>
  );
}
