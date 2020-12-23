/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(3) auth.helper.js : additional methods for authController.js', ()=>{
  let comparePasswordStub;
  let authMock;
  let generatorMock;
  let initAuthHelper;
  let authHelper;
  let authfnMock;
  let user;
  let req;
  let res;
  let err;
  beforeEach(() => {
    user={};
    authMock = {
      findOne: sinon.stub(),
      create: sinon.stub(),
    };
    generatorMock = {generate: sinon.stub()};
    comparePasswordStub = sinon.stub();
    authfnMock={
      _checkpassword: sinon.stub(),
      _createNewAccount: sinon.stub(),
      _setsession: sinon.stub(),
    };
    user = {
      correctPassword: sinon.stub(),
    };
    req = {
      body: {},
      session: {},
    };
    res = {
      send: sinon.stub().returns('DONE'),
    };
    err = null;
    initAuthHelper = () => {
      authHelper = proxyquire(
          '../../../src/helper/auth.helper',
          {
            '../models/auth.model': authMock,
            '../helper/auth.helper': authfnMock,
            'generate-password': generatorMock,
          });
    };
  });
  afterEach(() => {
  });
  describe('._checkpassword()', () => {
    it('should work correctly when \'checkMatch\' return true', async () => {
      initAuthHelper();
      user.correctPassword.resolves(true);
      assert.deepEqual(await authHelper._checkpassword(user, 'test', 'test'), true);
    });
    it('should work correctly when \'checkMatch\' return false', async () => {
      initAuthHelper();
      user.correctPassword.resolves(false);
      assert.deepEqual(await authHelper._checkpassword(user, 'test', 'test'), false);
    });
    it('should throw error', async () => {
      initAuthHelper();
      const error = new Error('error');
      user.correctPassword.throws(error);
      try {
        await authHelper._checkpassword(user, 'test', 'test');
      } catch (e) {
        assert.deepEqual(e, error);
      }
    });
  });
  describe('._createNewAccount()', () => {
    it('should call _createNewAccount with no error', async () => {
      initAuthHelper();
      const username = 'test';
      const json = ({
        username: 'test',
        password: 123456789,
      });
      const password = await generatorMock.generate.returns('123456789');
      await authMock.create({username, password});
      const resx = await authHelper._createNewAccount({username, password});
      assert.deepEqual(resx.password, JSON.stringify(json.password));
    });
    it('should call _createNewAccount with an error', async () => {
      initAuthHelper();
      const error = new Error('error');
      const username = 'test';
      const password = 'test';
      generatorMock.generate.throws(error);
      authMock.create.throws(error);
      try {
        authHelper._createNewAccount({username, password});
      } catch (e) {
        assert.deepEqual(e, error);
      }
    });
  });
  describe('._setsession()', () => {
    it('should call _setsession with no error', async () => {
      initAuthHelper();
      req.session={
        username: 'test',
        password: 'test',
      };
      const setUser = 'setUser';
      const setPass = 'setPass';

      assert.deepEqual(await authHelper._setsession(req.session, setUser, setPass), true);
    });
    it('should throw error', async () => {
      initAuthHelper();
      req.session={
        username: 'test',
        password: 'test',
      };
      const setUser = 'setUser';
      const setPass = 'setPass';
      const error = new Error('error');
      authfnMock._setsession.throws(error);
      try {
        await authHelper._setsession(req.session, setUser, setPass);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
});
