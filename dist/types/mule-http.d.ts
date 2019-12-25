import { User, Action } from './mule';
export interface MuleUserCreateResponse {
    userId: string;
}
export declare type MuleUserSessionResponse = User;
export interface MuleUserLoginRequest {
    username: string;
    password: string;
}
export interface MuleUserLoginResponse {
    userId: string;
    username: string;
}
export interface MuleGamesPlayTurnRequest extends MulePlayTurnRequest {
    gameId: string;
}
export interface MulePlayTurnRequest {
    playerId: string;
    actions: Action[];
}
export interface MulePlayTurnResponse {
    msg: string;
    turnNumber: number;
}
