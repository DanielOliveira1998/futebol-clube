import { ITeam } from './ITeam';

export interface ITeamModel {
  findall(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>
}
