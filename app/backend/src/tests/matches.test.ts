import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches'
import { matchesList, filteredList } from './mocks/matchesMock';

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
    it('O endpoint deve retornar a lista de partidas corretamente', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesList as any);
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesList);
    });
    it.only('O endpoint retorna a lista de partidas de acordo com o filtro inProgress', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(filteredList as any);
      const { status, body } = await chai.request(app).get('/matches?inProgress=true');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(filteredList);
    })
  });
})