import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/SequelizeMatches'
import { matchesList } from './mocks/matchesMock';

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
    it.only('O endpoint deve retornar a lista de partidas corretamente', async () => {
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesList as any);
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(matchesList);
    });
  });
})