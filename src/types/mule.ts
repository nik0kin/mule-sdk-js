
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
  turnProgressStyle: string;
  turnTimeLimit: number;
}

export interface PlayersMap {
  [playerNum: string]: { //  'p1'
    playerId: string;
    playerStatus: string;
    name?: string; // added by getPlayersMapQ()
  };
}

export interface RuleBundle {
  name: string;
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
  pieces: Piece[];
  playerVariables: {
    [playerNum: string]: {[variable: string]: string | number | boolean};
  };
  spaces: Space[];
}

export interface Piece {
  _id: string;
  id: number;
  class: string;
  locationId: string;
  ownerId: string; // playerNum (eg. p1)
}

export interface Space {
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
  turnSubmitStyle: string;
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

