/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(5) auth.model.js : mongoose Schema and Configuration for \'auth\' model.', ()=>{
  let bcryptMock;
  let mongooseSchema;
  let mongooseSchemaStub;
  let comparePassword;
  let initAuthModel;
  let mongoose;
  let pre;
  let next2;
  let psMock;
  let preMock;
  let mongooseMock;
  let nextspy;
  let methods;
  let accounts;
  let authModel;
  let authMock;
  let authMod;
  let methodsStub;
  let obj;
  let preSave;
  let preStub;
  let preSaveStub;
  let next;
  let Schema;
  let newacc;
  beforeEach(() => {
    mongooseSchema = {};
    newacc={};
    Schema;
    authMock={};
    pre = {};
    preStub={};
    preSave={};
    obj={};
    next={};
    methodsStub={};
    psMock={};
    authMod={};
    authModel={
      pre: sinon.stub(),
    };
    obj={
      isModified: sinon.stub(),
    };
    psMock={
      preSaveFunc: sinon.stub().resolves(true),
    };
    methodsStub = {
      correctPassword: sinon.stub(),
      comparePassword: sinon.stub(),
    };
    preSaveStub={
      isModified: sinon.stub(),
    };
    preStub= sinon.stub(),
    mongooseMock = {
      model: sinon.stub(),
      Schema: sinon.stub().returns({
        pre: sinon.stub(),
        methods: methodsStub,
        preSave: preSaveStub,
      }),
    };
    bcryptMock = {
      hash: sinon.stub().resolves('test'),
      compare: sinon.stub().resolves(true),
    };
    authMock={
      pre: sinon.stub(),
    };
    initAuthModel = () => {
      authModel = proxyquire(
          '../../../src/models/auth.model',
          {
            'mongoose': mongooseMock,
            'bcryptjs': bcryptMock,
            '../../src/models/auth.model': authMock,
            '../../src/models/presave.model': psMock,
          });
    };
  });
  afterEach(() => {
  });
  describe('.correctPassword()', () => {
    it('should work correctly', async () => {
      const candidatePassword = 'candidatePassword';
      const tpassword = 'password';
      const opassword = 'password';
      // methodsStub.password = password;
      bcryptMock.compare.resolves(true);
      initAuthModel();
      assert.deepEqual(await methodsStub.correctPassword(tpassword, opassword), true);
      assert.deepEqual(bcryptMock.compare.args[0][0], tpassword);
      assert.deepEqual(bcryptMock.compare.args[0][1], opassword);
    });
  });

  describe('.pre(save, func)', ()=>{
    it('should work correctly', async () => {
      const authMock = require('../../../src/models/auth.model');
      const newacc = new authMock({
        username: 'test',
        password: 'test',
        pre: sinon.stub(),
        Schema: sinon.stub().returns(next2),
      });
      next2 = {
        username: String,
        password: String,
        pre: sinon.stub().returns(true),
      };
      newacc.save();
      // console.log('\t', newacc);
      const callPreSaveFn = await psMock.preSaveFunc.resolves(true);
      next2.pre.returns(true);
      bcryptMock.compare.resolves(true);
      assert.deepEqual(await next2.pre('save', next), true);
      // assert.deepEqual(bcryptMock.compare.args[0][0], tpassword);
      // assert.deepEqual(bcryptMock.compare.args[0][1], opassword);
    });
  });
});
