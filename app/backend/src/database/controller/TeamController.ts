import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(_req:Request, res: Response) {
    const response = await this.teamService.getAllTeams();
    res.status(200).json(response.data);
  }
}
