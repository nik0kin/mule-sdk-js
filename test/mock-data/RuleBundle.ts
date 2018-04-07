
import { RuleBundle, TurnSubmitStyle } from '../../src/types/mule';

export const backgammonRuleBundle: RuleBundle = {
  _id: 'ruleBundleId_104',
  name: 'Backgammon',
  turnSubmitStyle: TurnSubmitStyle.RoundRobin,
  canAutoProgress: false,
  staticBoardSettings: {
    boardStyle: 'static'
  },
  gameSettings: {
    playerLimit: 2,
    customBoardSettings: {}
  },
  rules: {
    dynamicBoard: false,
  }
};
