import { IMatch } from './IMatch';
import { IFinishedMatch } from './IFinishedMatch';

export interface IMatchModel {
  findall(inProgress: boolean | null): Promise<IMatch[]>,
  finishMatch(id:number): Promise<IFinishedMatch>
}
