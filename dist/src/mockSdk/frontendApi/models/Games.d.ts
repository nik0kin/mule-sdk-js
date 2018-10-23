/// <reference types="q" />
import { Promise } from 'q';
import { Game, PlayersMap } from '../../../types/mule';
import { GamesApi, UnknownType } from '../../../types/sdk';
export declare class MockGamesApi implements GamesApi {
    indexQ: () => Promise<Game[]>;
    createQ: (params: UnknownType) => Promise<UnknownType>;
    readQ: (gameId: string) => Promise<Game>;
    readUsersGamesQ: (userId: string) => Promise<Game[]>;
    readMyGamesQ: () => Promise<Game[]>;
    joinGameQ: (gameId: string) => Promise<UnknownType>;
    getPlayersMapQ: (game: Game) => Promise<PlayersMap>;
}
export declare const gamesApi: GamesApi;
