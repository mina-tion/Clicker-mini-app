import { FEATURE_TOGGLES_ROUTES_NAME } from '@core/feature-toggles';

export const ROUTES_NAME = {
  ROOT: '/',
  REFERRALS: 'referrals',
  EARN: 'earn',
  LEADERBOARD: 'leaderboard',
  ...FEATURE_TOGGLES_ROUTES_NAME,
  OTHER: '*'
} as const;
