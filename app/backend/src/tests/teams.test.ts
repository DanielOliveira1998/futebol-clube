import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/SequelizeTeams'
import { teamsList, teamslistType } from './mocks/teamsMock';

import { App } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App;

describe('Teams teste', () => {
  describe('Requisição com sucesso', () => {
    it.only('O endpoint deve retornar a lista de times corretamente', async () => {
      sinon.stub(SequelizeTeams, 'findAll').resolves(teamsList as any);
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamsList);
    });
  });
});