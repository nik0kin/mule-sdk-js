import { Game } from '../../types/mule';

export const database: MockDatabase = {
  Games: []
};

export interface MockDatabase {
  Games: Game[];
}

export interface MockData {
  Games?: Game[];
}

export function setMockData(data: MockData) {
  if (data.Games) {
    database.Games = database.Games.concat(data.Games);
  }
}
