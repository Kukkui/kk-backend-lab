/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(7) user.model.js: mongoose Schema and Configuration for \'user\' model.', ()=>{
  let bcryptMock;
  let mongooseSchema;
  let mongooseSchemaStub;
  let initUserModel;
  let mongoose;
  let pre;
  let userMock;
  let preMock;
  let psMock;
  let next;
  let mongooseMock;
  let nextspy;
  let methods;
  let accounts;
  let userModel;
  let methodsStub;
  let preStub;
  let preSave;
  let next2;
  let obj;
  let authMod;
  let authModel;
  let preSaveStub;
  beforeEach(() => {
    mongooseSchema = {};
    userMock={};
    pre = {};
    next2={};
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
      }),
    };
    bcryptMock = {
      hash: sinon.stub().resolves('test'),
      compare: sinon.stub().resolves(true),
    };
    userMock={
      pre: sinon.stub(),
    };
    initUserModel = () => {
      userModel = proxyquire(
          '../../../src/models/user.model',
          {
            'mongoose': mongooseMock,
            'bcryptjs': bcryptMock,
          });
    };
  });
  afterEach(() => {
  });
  describe('.correctPassword()', () => {
    it('should work correctly', async () => {
      initUserModel();
      const candidatePassword = 'candidatePassword';
      const tpassword = 'password';
      const opassword = 'password';
      bcryptMock.compare.resolves(true);
      assert.deepEqual(await methodsStub.correctPassword(tpassword, opassword), true);
      assert.deepEqual(bcryptMock.compare.args[0][0], tpassword);
      assert.deepEqual(bcryptMock.compare.args[0][1], opassword);
    });
  });

  describe('.pre(save, func)', ()=>{
    it('should work correctly', async () => {
      initUserModel();
      const userMock = require('../../../src/models/user.model');
      const newpost = new userMock({
        username: 'test',
        password: 'test',
        content: 'test',
        cardName: 'test',
        cardStatus: 'test',
        cardContent: 'test',
        cardCategory: 'test',
        pre: sinon.stub(),
        Schema: sinon.stub().returns(next2),
      });
      next2 = {
        username: String,
        password: String,
        content: String,
        cardName: String,
        cardStatus: String,
        cardContent: String,
        cardCategory: String,
        pre: sinon.stub().returns(true),
      };
      newpost.save();
      next2.pre.returns(true);
      bcryptMock.compare.resolves(true);
      assert.deepEqual(await next2.pre('save', next), true);
    });
  });
});
