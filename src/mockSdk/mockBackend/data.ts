import { assign, find, findIndex } from 'lodash';
import { Promise, resolve, reject } from 'q';

import {
  DataModelTypes,
  Game,
  GameBoard,
  History,
  RuleBundle,
  GameState,
  PieceState,
  SpaceState,
  Turn,
  User,
  Persistable,
} from '../../types/mule';

export const database: MockDatabase = {
  Games: [],
  GameBoards: [],
  Historys: [],
  RuleBundles: [],
  GameStates: [],
  PieceStates: [],
  SpaceStates: [],
  Turns: [],
  Users: [],
};

export type DatabaseKeys = keyof MockDatabase;

export interface MockDatabase {
  Games: Game[];
  GameBoards: GameBoard[];
  Historys: History[];
  RuleBundles: RuleBundle[];
  GameStates: GameState[];
  PieceStates: PieceState[];
  SpaceStates: SpaceState[];
  Turns: Turn[];
  Users: User[];
}

export interface MockData {
  Games?: Game[];
  GameBoards?: GameBoard[];
  Historys?: History[];
  GameStates?: GameState[];
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
  if (data.GameBoards) {
    database.GameBoards = database.GameBoards.concat(data.GameBoards);
  }
  if (data.Historys) {
    database.Historys = database.Historys.concat(data.Historys);
  }
  if (data.RuleBundles) {
    database.RuleBundles = database.RuleBundles.concat(data.RuleBundles);
  }
  if (data.GameStates) {
    database.GameStates = database.GameStates.concat(data.GameStates);
  }
  if (data.PieceStates) {
    database.PieceStates = database.PieceStates.concat(data.PieceStates);
  }
  if (data.SpaceStates) {
    database.SpaceStates = database.SpaceStates.concat(data.SpaceStates);
  }
  if (data.Turns) {
    database.Turns = database.Turns.concat(data.Turns);
  }
  if (data.Users) {
    database.Users = database.Users.concat(data.Users);
  }
}

export function resetMockData() {
  database.Games = [];
  database.GameBoards = [];
  database.Historys = [];
  database.RuleBundles = [];
  database.PieceStates = [];
  database.SpaceStates = [];
  database.Turns = [];
  database.Users = [];
}

export function genericGet<T extends Persistable>(type: DataModelTypes, id: string): T | undefined {
  const dataArray: Persistable[] = database[type];
  const foundData: T | undefined = find(dataArray as T[], (data: T) => {
    return data._id === id;
  });
  return foundData;
}

export function genericGetData<T extends Persistable>(type: DataModelTypes): (id: string) => Promise<T> {
  
  return (id: string) => {
    const foundData: T | undefined = genericGet<T>(type, id);

    if (foundData) {
      return resolve(foundData);
    } else {
      return reject({
        statusCode: 404,
        statusMessage: 'Could not find type=' + type + ': ' + id,
      });
    }
  };
}

let newIdIterator: number = 1000;
function getNewId(type: DataModelTypes) {
  return type + 'Id_' + newIdIterator++;
}

export function genericCreate<T extends Persistable>(type: DataModelTypes, pT: Partial<T>): T {
  const dataArray: Persistable[] = database[type];
  const newT: T = assign({}, {_id: getNewId(type)}, pT) as T;

  dataArray.push(newT);

  return newT;
}

export function genericSave<T extends Persistable>(type: DataModelTypes, _t: T): T {
  const dataArray: Persistable[] = database[type];
  const foundKey: number | undefined = findIndex(dataArray as T[], (data: T) => {
    return data._id === _t._id;
  });
  if (foundKey === -1) {
    throw 'please create before attempting to save ';
  }
  dataArray[foundKey] = _t;

  return _t;
}
