import { Button, Center } from '@chakra-ui/react';
import { ROUTER_LINKS } from '@core/constants/RouterLinks';
import { FEATURE_TOGGLES } from '@core/feature-toggles';
import { NavLink } from 'react-router-dom';

export function MetamaskNavLink() {
  return (
    <>
      { FEATURE_TOGGLES.METAMASK.ENABLED && (
        <Center>
          <NavLink to={ROUTER_LINKS.METAMASK}>
            <Button>Metamask</Button>
          </NavLink>
        </Center>
        )
      }
    </>
  );
}
