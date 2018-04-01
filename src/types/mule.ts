
export interface User {
  _id: number;
  username: string;
}

export interface MuleUserCreateResponse {
  userId: string;
};

export interface MuleUserSessionResponse {
  [s: string]: any;
};

export interface MuleUserLoginResponse {
  [s: string]: any;
};

export interface UserCache {
  [userId: string]: User;
}

export interface Game {
  _id: string;
  gameBoard: string; // id
  gameStatus: string;
  maxPlayers: number;
  players: PlayersMap;
  name: string;
  nextTurnTime: Date;
  ruleBundle: {
    id: string;
    name: string;
  };
  ruleBundleGameSettings: {
    customBoardSettings: any;
  };
  turnProgressStyle: TurnProgressStyle;
  turnTimeLimit: number;
}

export interface PlayersMap {
  [playerNum: string]: { //  'p1'
    playerId: string;
    playerStatus: string;
    name?: string; // added by getPlayersMapQ()
  };
}

export enum TurnProgressStyle {
  WaitProgress = 'waitprogress', // waits for all players to submit turns
  AutoProgress = 'autoprogress', // progresses after a timer
  AutoBoot = 'autoboot', // never implemented
}

export interface RuleBundle {
  _id: string;
  name: string;
  turnSubmitStyle: TurnSubmitStyle;
  canAutoProgress: boolean;
  staticBoardSettings: {
    boardStyle: string;
  };
  gameSettings: {
    playerLimit: number;
    customBoardSettings: any;
  }
}

export enum TurnSubmitStyle {
  RoundRobin = 'roundRobin', // p1 plays -> progressTurn(p1) -> p2 plays -> progressTurn(p2) -> progressRound -> repeat til winCondition is true
  PlayByMail = 'playByMail', // wait til (p1 plays & p2 plays) -> progressRound -> repeat til winCondition is true
}

export interface GameBoardCache {
  [gameBoardId: string]: GameBoard;
}

export interface GameBoard {
  _id: string;
  board: BoardSpace[];
  boardType: string;
  gameState: string; // id
  history: string; // id
  ruleBundle: {
    id: string;
    name: string;
  }
}

export interface BoardSpace {
  id: string;
  class: string;
  attributes: {
    [attribute: string]: string;
  };
  edges: {id: string}[];
}

export interface GameState {
  globalVariables: {[variable: string]: string | number | boolean};
  pieces: PieceState[];
  playerVariables: {
    [playerNum: string]: {[variable: string]: string | number | boolean};
  };
  spaces: SpaceState[];
}

export interface PieceState {
  _id: string;
  id: number;
  class: string;
  locationId: string;
  ownerId: string; // playerNum (eg. p1)
}

export interface SpaceState {
  _id: string;
  boardSpaceId: string;
  attributes: {[attribute: string]: string | number | boolean};
}

export interface History {
  _id: string;
  currentPlayerIndexTurn: number;
  currentRound: number;
  currentTurn: number;
  currentTurnStatus: {
    [playerNum: string]: boolean; 
  };
  gameId: string;
  turnOrder: string[]; // string = playerNum (eg: p1, p2)
  turnSubmitStyle: TurnSubmitStyle;
  turns: {
    meta?: Turn[];
    [turnIndex: number]: Turn[];
   };
}

export interface Turn {
  _id: string;
  gameId: string;
  playerTurns: {
    [playerNum: string]: {
      actions: any[];
      dateSubmitted: Date;
    }
  }
}

