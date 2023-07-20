import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/SequelizeTeams'
import { teamsList, teamById } from './mocks/teamsMock';

import { App } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App;

describe('Teams teste', () => {
  afterEach(function () {
    sinon.restore();
  })

  describe('Requisição com sucesso', () => {
    it('O endpoint deve retornar a lista de times corretamente', async () => {
      sinon.stub(SequelizeTeams, 'findAll').resolves(teamsList as any);
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamsList);
    });
    it('O endpoint deve retornar o time de acordo com o id fornecido', async () => {
      sinon.stub(SequelizeTeams, 'findOne').resolves(teamById as any);
      const { status, body } = await chai.request(app).get('/teams/3');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teamById);
    })
  });

  describe('Requisição com falha', () => {
    it('Retorna not Found caso não encontre um time correpondente ao id fornecido', async () => {
      sinon.stub(SequelizeTeams, 'findOne').resolves(null);
      const { status, body } = await chai.request(app).get('/books/33');
      expect(status).to.equal(404);
      expect(body).to.deep.equal({});
    })
  })
});