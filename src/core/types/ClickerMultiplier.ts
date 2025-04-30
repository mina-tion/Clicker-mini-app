import { ClickerMultipliers } from '@core/constants/ClickerStates.ts';

export type ClickerMultiplier = typeof ClickerMultipliers[keyof typeof ClickerMultipliers];
