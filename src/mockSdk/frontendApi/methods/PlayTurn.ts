import {
  MuleGamesPlayTurnRequest, MulePlayTurnRequest, MulePlayTurnResponse
} from '../../../types/mule-http';
import { PlayTurnApi } from '../../../types/sdk';

import { playTurn } from '../../mockBackend/brain';

export class MockPlayTurnApi implements PlayTurnApi {
  public sendQ = (params: MuleGamesPlayTurnRequest): Promise<MulePlayTurnResponse> => {
    return playTurn(params.gameId, params);
  }
  public sendGameTurnQ = (gameId: string, params: MulePlayTurnRequest): Promise<MulePlayTurnResponse> => {
    return playTurn(gameId, params);
  }
}