import { ROUTES_NAME } from './Routes';

const ENABLED = import.meta.env.VITE_METAMASK_FEATURE_TOGGLE === 'true';

export default {
  ENABLED,
  ROUTES_NAME
};
