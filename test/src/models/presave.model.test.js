/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(6) presave.model.js : pre-save hook mongoose model.', ()=>{
  let bcryptMock;
  let mongooseSchema;
  let psMock;
  let initPresaveModel;
  let next;
  let pre;
  let presaveModel;
  let methodsStub;
  let obj;
  beforeEach(() => {
    mongooseSchema = {};
    pre = {};
    psMock={};
    next={};
    methodsStub={};
    obj={
      isModified: sinon.stub(),
    };
    psMock={
      isModified: sinon.stub(),
    };
    methodsStub = {
      correctPassword: sinon.stub(),
      comparePassword: sinon.stub(),
      isModified: sinon.stub(),
    };
    bcryptMock = {
      hash: sinon.stub().resolves('000000000000'),
      compare: sinon.stub().resolves(true),
    };
    initPresaveModel = () => {
      presaveModel = proxyquire(
          '../../../src/models/presave.model',
          {
            'bcryptjs': bcryptMock,
            '../../src/models/presave.model': psMock,
          });
    };
  });
  afterEach(() => {
  });
  describe('.presave()', () => {
    it('should work correctly with true conditions', async () => {
      initPresaveModel();
      const next= function() {
        return false;
      };
      obj.isModified.returns(false);
      obj.password = 'password';
      obj.passwordConfirm= undefined;
      assert.deepEqual(await presaveModel.preSaveFunc(next, obj), false);
    });
    it('should work correctly with true conditions', async () => {
      initPresaveModel();
      const next= function() {
        return true;
      };
      obj.isModified.returns(true);
      assert.deepEqual(await presaveModel.preSaveFunc(next, obj), true);
    });
  });
});
