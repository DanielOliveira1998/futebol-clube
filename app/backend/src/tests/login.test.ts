import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { validLogin, invalidLogin, invalidPassword } from './mocks/loginMock';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { userData } from './mocks/userMock';

import { App } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App;

describe('Login test', () => {
  afterEach(function () {
    sinon.restore()
  })

  describe('Requisição com sucesso', () => {
    it('Login com sucesso retornando token', async () => {
      const mockUser = SequelizeUsers.build(userData);
      sinon.stub(SequelizeUsers, 'findOne').resolves(mockUser as any);
      const { status, body } = await chai.request(app).post('/login').send(validLogin);
      expect(status).to.equal(200);
      expect(body).to.haveOwnProperty('token');
    })
    // it('Rota login/role recebe o token no parâmetro auhorization', async () => {
    //   const { status, body } = await chai.request(app).get('/login/role').set('authorization', 'bearer test-test');

    // })
  });
  describe('Requisição invalida', () => {
    it('Email inválido', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidLogin);
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    })
    it('Password inválido', async () => {
      const { status, body } = await chai.request(app).post('/login').send(invalidPassword);
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    })
    it('Não deve consegui logar com email não cadastrado', async () => {
      const { status, body } = await chai.request(app).post('/login').send(validLogin);
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Not Found' });
    })
  })
})