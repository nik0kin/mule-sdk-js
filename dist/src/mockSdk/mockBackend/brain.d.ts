import { MulePlayTurnRequest, MulePlayTurnResponse } from '../../types/mule-http';
export declare class BackendMockBrain {
}
export declare function playTurn(gameId: string, params: MulePlayTurnRequest): Promise<MulePlayTurnResponse>;
