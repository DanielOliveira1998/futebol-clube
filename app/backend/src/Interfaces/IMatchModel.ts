import { IMatch } from './IMatch';
import { ICreatedMatch } from './ICretedMatch';
import { IFinishedMatch } from './IFinishedMatch';

export interface IMatchModel {
  findall(inProgress: boolean | null): Promise<IMatch[]>,
  finishMatch(id:number): Promise<IFinishedMatch>
  updateScoreboard(id: number, homeScore: number, awayScore: number): Promise<IFinishedMatch>
  createMatch(math: ICreatedMatch): Promise<IMatch>
}
