import { IMatch } from './IMatch';

export interface IMatchModel {
  findall(inProgress: boolean | null): Promise<IMatch[]>,
}
