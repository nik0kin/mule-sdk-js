/// <reference types="q" />
import * as Q from 'q';
import { PlayTurnApi, UnknownType } from '../../../types/sdk';
export declare class MockPlayTurnApi implements PlayTurnApi {
    sendQ: (params: UnknownType) => Q.Promise<UnknownType>;
    sendGameTurnQ: (gameId: string, params: UnknownType) => Q.Promise<UnknownType>;
}
