import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { validLogin, invalidLogin, invalidPassword } from './mocks/loginMock';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { userData } from './mocks/userMock';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { App } from '../app';

import { Response } from 'superagent';
import { verify } from 'crypto';

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
      sinon.stub(SequelizeUsers, 'findOne').resolves(mockUser);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      const { status, body } = await chai.request(app).post('/login').send(validLogin);
      expect(status).to.equal(200);
      expect(body).to.haveOwnProperty('token');
    })
    it('Rota login/role devolve role do usuario', async () => {
      const { status, body } = await chai.request(app).get('/login/role').set('authorization', 'Bearer test-test');
      console.log("1 ", body);
      sinon.stub(jwt, 'verify').callsFake(() => { validLogin })
      expect(status).to.equal(200);
      expect(body).to.haveOwnProperty('role');
    })
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
      console.log("2 ", body);
      sinon.stub(SequelizeUsers, 'findOne').resolves(null);
      sinon.stub(bcrypt, 'compareSync').returns(true);
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Not Found' });
    })
    it('Rota login/role não recebe token', async () => {
      const { status, body } = await chai.request(app).get('/login/role');
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    })
  })
})