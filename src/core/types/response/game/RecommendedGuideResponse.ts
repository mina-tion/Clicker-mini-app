import { Reward } from '@core/types/Reward.ts';

export type RecommendedGuideResponse = {
  questId: number;
  name: string;
  avatar: string;
  rewards: Reward[];
};
