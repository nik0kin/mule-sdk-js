import {
  Game,
  GameBoard,
} from '../../types/mule';

export const database: MockDatabase = {
  Games: [],
  GameBoards: [],
};

export interface MockDatabase {
  Games: Game[];
  GameBoards: GameBoard[];
}

export interface MockData {
  Games?: Game[];
  GameBoards?: GameBoard[];
}

export function setMockData(data: MockData) {
  if (data.Games) {
    database.Games = database.Games.concat(data.Games);
  }
  if (data.GameBoards) {
    database.GameBoards = database.GameBoards.concat(data.GameBoards);
  }
}
