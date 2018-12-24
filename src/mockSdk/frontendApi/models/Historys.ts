import { map } from 'lodash';
import Promise from 'promise-polyfill';

import {
  DataModelTypes, Turn, FullHistory, LiteHistory, Game, GameBoard,
  PlayByMailHistoryTurns, RoundRobinHistoryTurns, TurnSubmitStyle,
  LiteRoundRobinHistory, LitePlayByMailHistory,
} from '../../../types/mule';
import { HistorysApi } from '../../../types/sdk';

import { database, genericGetData, genericGet } from '../../mockBackend/data';

export class MockHistorysApi implements HistorysApi {
  public indexQ = (): Promise<LiteHistory[]> => {
    return Promise.resolve(database.Historys);
  }
  public readQ: (gameStateId: string) => Promise<LiteHistory> = genericGetData<LiteHistory>(DataModelTypes.Historys);
  public readGamesHistoryQ = (gameId: string): Promise<LiteHistory> => {
    return getGamesHistory(gameId);
  }
  public readGamesFullHistoryQ = (gameId: string): Promise<FullHistory> => {
    return getGamesHistory(gameId)
      .then((liteHistory: LiteHistory) => {
        return {
          ...liteHistory,
          turns: getHistoryTurns(liteHistory),
        } as FullHistory;
      });
  }
}

export const historysApi: HistorysApi = new MockHistorysApi();

function getGamesHistory(gameId: string): Promise<LiteHistory> {
  return genericGetData<Game>(DataModelTypes.Games)(gameId)
    .then((game: Game) => {
      return genericGetData<GameBoard>(DataModelTypes.GameBoards)(game.gameBoard);
    })
    .then((gameBoard: GameBoard) => {
      return genericGetData<LiteHistory>(DataModelTypes.Historys)(gameBoard.history);
    });
}

function getHistoryTurns(
  liteHistory: LiteHistory
): RoundRobinHistoryTurns<Turn> | PlayByMailHistoryTurns<Turn> {
  if (liteHistory.turnSubmitStyle === TurnSubmitStyle.RoundRobin) {
    const liteRRHistory = liteHistory as LiteRoundRobinHistory;
    return map(liteRRHistory.turns, (turns: string[]): Turn[] => {
      return map(
        turns,
        (turnId: string): Turn => genericGet<Turn>(DataModelTypes.Turns, turnId) as Turn,
      );
    }) as RoundRobinHistoryTurns<Turn>;
  } else if (liteHistory.turnSubmitStyle === TurnSubmitStyle.PlayByMail) {
    const litePBMHistory = liteHistory as LitePlayByMailHistory;
    return map(litePBMHistory.turns, (turnId: string): Turn => {
      return genericGet<Turn>(DataModelTypes.Turns, turnId) as Turn;
    }) as PlayByMailHistoryTurns<Turn>;
  } else {
    throw new Error('Unknown TurnSubmitStyle: ' + liteHistory.turnSubmitStyle);
  }
}
