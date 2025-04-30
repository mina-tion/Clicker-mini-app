import abandoned from './../../assets/images/clickerStates/abandoned.gif';
import bored from './../../assets/images/clickerStates/bored.gif';
import dead from './../../assets/images/clickerStates/dead.gif';
import defaultForth from './../../assets/images/clickerStates/defaultForth.gif';
import defaultSecond from './../../assets/images/clickerStates/defaultSecond.gif';
import defaultThird from './../../assets/images/clickerStates/defaultThird.gif';
import excellent from './../../assets/images/clickerStates/excellent.gif';
import godlike from './../../assets/images/clickerStates/godlike.gif';
import impressive from './../../assets/images/clickerStates/impressive.gif';

import sad from './../../assets/images/clickerStates/sad.gif';
import defaultFirst from './../../assets/images/defaultPusher.svg';

export const ClickerStates = {
  GODLIKE: 'GODLIKE',
  IMPRESSIVE: 'IMPRESSIVE',
  EXCELLENT: 'EXCELLENT',
  DEFAULT_FIRST: 'DEFAULT_FIRST',
  DEFAULT_SECOND: 'DEFAULT_SECOND',
  DEFAULT_THIRD: 'DEFAULT_THIRD',
  DEFAULT_FORTH: 'DEFAULT_FORTH',
  BORED: 'BORED',
  SAD: 'SAD',
  ABANDONED: 'ABANDONED',
  DEAD: 'DEAD',
} as const;

export const ImagesToClickerStates = {
  [ClickerStates.GODLIKE]: godlike,
  [ClickerStates.IMPRESSIVE]: impressive,
  [ClickerStates.EXCELLENT]: excellent,
  [ClickerStates.DEFAULT_FIRST]: defaultFirst,
  [ClickerStates.DEFAULT_SECOND]: defaultSecond,
  [ClickerStates.DEFAULT_THIRD]: defaultThird,
  [ClickerStates.DEFAULT_FORTH]: defaultForth,
  [ClickerStates.BORED]: bored,
  [ClickerStates.SAD]: sad,
  [ClickerStates.ABANDONED]: abandoned,
  [ClickerStates.DEAD]: dead,
} as const;

export const ClickerMultipliers = {
  BRONZE: 'BRONZE',
  SILVER: 'SILVER',
  GOLD: 'GOLD',
} as const;

export const EnergyToMultipliers = {
  [ClickerMultipliers.BRONZE]: 2000,
  [ClickerMultipliers.SILVER]: 4000,
  [ClickerMultipliers.GOLD]: 6000,
} as const;
