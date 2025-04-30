import { QuestDetails } from '@core/types/QuestDetails.ts';
import { Reward } from '@core/types/Reward.ts';

interface Guide {
  id: number;
  name: string;
  partner: string;
  clickBaitPhrase: string;
  description: string;
  reward: Reward;
  requiredQuestId: number;
  completionTime: number;
  releaseDate: string;
  rewardDate: string;
  externalStatus: string;
  background: string;
  image: string;
  avatar: string;
  sequenceIndex: number;
  questDetails: QuestDetails;
}

export type GuidesListResponse = Guide[];
