/// <reference types="q" />
import { Promise } from 'q';
import { DataModelTypes, Game, GameBoard, LiteHistory, RuleBundle, GameState, PieceState, SpaceState, Turn, User, Persistable } from '../../types/mule';
export declare const database: MockDatabase;
export declare type DatabaseKeys = keyof MockDatabase;
export interface MockDatabase {
    Games: Game[];
    GameBoards: GameBoard[];
    Historys: LiteHistory[];
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
    Historys?: LiteHistory[];
    GameStates?: GameState[];
    RuleBundles?: RuleBundle[];
    PieceStates?: PieceState[];
    SpaceStates?: SpaceState[];
    Turns?: Turn[];
    Users?: User[];
}
export declare function addMockData(data: MockData): void;
export declare function resetMockData(): void;
export declare function genericGet<T extends Persistable>(type: DataModelTypes, id: string): T | undefined;
export declare function genericGetData<T extends Persistable>(type: DataModelTypes): (id: string) => Promise<T>;
export declare function genericCreate<T extends Persistable>(type: DataModelTypes, pT: Partial<T>): T;
export declare function genericSave<T extends Persistable>(type: DataModelTypes, _t: T): T;
