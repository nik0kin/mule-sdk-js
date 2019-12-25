import { MuleGamesPlayTurnRequest, MulePlayTurnRequest, MulePlayTurnResponse } from '../../../types/mule-http';
import { PlayTurnApi } from '../../../types/sdk';
export declare class MockPlayTurnApi implements PlayTurnApi {
    sendQ: (params: MuleGamesPlayTurnRequest) => Promise<MulePlayTurnResponse>;
    sendGameTurnQ: (gameId: string, params: MulePlayTurnRequest) => Promise<MulePlayTurnResponse>;
}
