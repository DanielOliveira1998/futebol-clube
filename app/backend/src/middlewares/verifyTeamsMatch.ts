import { NextFunction, Request, Response } from 'express';

class verifyTeamsMatch {
  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body as { homeTeamId: number, awayTeamId: number };
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

export default verifyTeamsMatch;
