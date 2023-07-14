import { ITeam } from './ITeam';

export interface ITeamModel {
  findall(): Promise<ITeam[]>,
}
