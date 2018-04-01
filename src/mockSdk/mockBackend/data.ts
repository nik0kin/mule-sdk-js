import {
  Game,
  GameBoard,
  History,
  RuleBundle,
  PieceState,
  SpaceState,
  Turn,
  User,
} from '../../types/mule';

export const database: MockDatabase = {
  Games: [],
  GameBoards: [],
  Historys: [],
  RuleBundles: [],
  PieceStates: [],
  SpaceStates: [],
  Turns: [],
  Users: [],
};

export interface MockDatabase {
  Games: Game[];
  GameBoards: GameBoard[];
  Historys: History[];
  RuleBundles: RuleBundle[];
  PieceStates: PieceState[];
  SpaceStates: SpaceState[];
  Turns: Turn[];
  Users: User[];
}

export interface MockData {
  Games?: Game[];
  GameBoards?: GameBoard[];
  Historys?: History[];
  RuleBundles?: RuleBundle[];
  PieceStates?: PieceState[];
  SpaceStates?: SpaceState[];
  Turns?: Turn[];
  Users?: User[];
}

export function addMockData(data: MockData) {
  if (data.Games) {
    database.Games = database.Games.concat(data.Games);
  }
  if (data.Historys) {
    database.Historys = database.Historys.concat(data.Historys);
  }
  if (data.RuleBundles) {
    database.RuleBundles = database.RuleBundles.concat(data.RuleBundles);
  }
  if (data.PieceStates) {
    database.PieceStates = database.PieceStates.concat(data.PieceStates);
  }
  if (data.PieceStates) {
    database.PieceStates = database.PieceStates.concat(data.PieceStates);
  }
  if (data.Turns) {
    database.Turns = database.Turns.concat(data.Turns);
  }
  if (data.Users) {
    database.Users = database.Users.concat(data.Users);
  }
}
