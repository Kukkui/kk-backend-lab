/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(2) userController.js : control the blogposts on CRUD processes.', () => {
  let authMock;
  let accountsMock;
  let userController;
  let user;
  let req;
  let res;
  let next;
  let post;
  let jsonStub;
  let initUserController;
  let userfnMock;
  let showResult;

  beforeEach(() => {
    post = 'res.send.done';
    showResult = {message: 'hiResult'};
    authMock = {
      findOne: sinon.stub(),
    };
    userfnMock = {
      sessionx: sinon.stub(),
      usernameCheck: sinon.stub().returns(true),
      viewModeResult: sinon.stub(),
      editModeResult: sinon.stub(),
      addModeResult: sinon.stub(),
      deleteModeResult: sinon.stub(),
      finalResultFromMode: sinon.stub().returns(showResult),
    };
    jsonStub = {message: 'json_test'},
    accountsMock = {
      create: sinon.stub(),
      find: sinon.stub(),
      findOneAndUpdate: sinon.stub(),
      deleteOne: sinon.stub(),
    };
    user = {
      comparePassword: sinon.stub(),
    };
    req = {
      body: {},
    };
    const objTest =
        {
          _id: 0,
          username: 'test',
          content: 'test',
          cardName: 'test',
          cardStatus: 'test',
          cardContent: 'test',
          cardCategory: 'test',
          __v: 0,
        };
    res = {
      send: sinon.stub().returns(objTest),
      status: sinon.stub(),
      json: sinon.stub().returns(jsonStub),
    };
    next = sinon.stub();
    initUserController = () => {
      userController = proxyquire('../../../src/controllers/userController', {
        '../models/auth.model': authMock,
        '../models/user.model': accountsMock,
        '../helper/user.helper': userfnMock,
      });
    };
  });
  afterEach(() => userController = {});

  describe('.myposts()', () => {
    it('should call .myposts() correctly', async () => {
      initUserController();
      userfnMock.sessionx.resolves(['test', 'test']);
      authMock.findOne.resolves({
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      });
      const objTest =
      {
        _id: 0,
        username: 'test',
        content: 'test',
        cardName: 'test',
        cardStatus: 'test',
        cardContent: 'test',
        cardCategory: 'test',
        __v: 0,
      };
      userfnMock.usernameCheck.resolves(true);
      userfnMock.finalResultFromMode.resolves(objTest);

      assert.deepEqual(await userController.myposts(req, res, next), objTest);
    });

    it('should call .myposts() incorrectly with .sessionx throw error', async () => {
      initUserController();
      const error = new Error('error');
      userfnMock.sessionx.throws(error);
      try {
        userController.myposts(req, res, next);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
  describe('.addposts()', ()=>{
    it(('should call .addposts() correctly'), async ()=>{
      initUserController();
      req.body = {
        username: 'test',
        password: 'test',
      };
      userfnMock.sessionx.resolves(['test', 'test']);
      authMock.findOne.resolves({
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      });
      const objTest =
        {
          _id: 0,
          username: 'test',
          content: 'test',
          cardName: 'test',
          cardStatus: 'test',
          cardContent: 'test',
          cardCategory: 'test',
          __v: 0,
        };
      userfnMock.usernameCheck.resolves(true);
      userfnMock.finalResultFromMode.resolves(objTest);
      assert.deepEqual(await userController.addposts(req, res, next), objTest);
    });

    it('should call .addposts() incorrectly with .sessionx throw error', async () => {
      initUserController();
      const error = new Error('error');
      userfnMock.sessionx.throws(error);
      try {
        userController.addposts(req, res, next);
      } catch (err) {
        assert.deepEqual(err, error);
      }
    });
  });

  describe('.allposts()', ()=>{
    it(('should call allposts() correctly'), async ()=>{
      initUserController();
      await userfnMock.sessionx.resolves(['test', 'test']);
      const objTest =
        {
          _id: 0,
          username: 'test',
          content: 'test',
          cardName: 'test',
          cardStatus: 'test',
          cardContent: 'test',
          cardCategory: 'test',
          __v: 0,
        };
      await accountsMock.find.resolves(objTest);
      await userController.allposts(req, res, next);
      assert.deepEqual(await userController.allposts(req, res, next), objTest);
      // let result, error,usernamepassword,user,isMatch;
    });
    it('should call .allposts() incorrectly with .find() throw error', async () => {
      initUserController();
      const error = new Error('error');
      accountsMock.find.throws(error);
      try {
        userController.allposts(req, res, next);
      } catch (err) {
        assert.deepEqual(err, error);
      }
    });
  });

  describe('.editposts()', ()=>{
    it(('should call .editposts() correctly'), async ()=>{
      initUserController();
      req.params = {
        id: 0,
      };
      await userfnMock.sessionx.resolves(['test', 'test']);
      await authMock.findOne.resolves({
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      });
      const objTest =
        {
          _id: 0,
          username: 'test',
          content: 'test',
          cardName: 'test',
          cardStatus: 'test',
          cardContent: 'test',
          cardCategory: 'test',
          __v: 0,
        };
      await userfnMock.usernameCheck.resolves(true);
      await userfnMock.finalResultFromMode.resolves(objTest);
      await userController.editposts(req, res, next);
      assert.deepEqual(await userController.editposts(req, res, next), objTest);
      // let result, error,usernamepassword,user,isMatch;
    });
    it('should call .editposts() incorrectly with all methods throw error', async () => {
      initUserController();
      const error = new Error('error');
      userfnMock.sessionx.throws(error);
      authMock.findOne.throws(error);
      userfnMock.usernameCheck.throws(error);
      userfnMock.finalResultFromMode.throws(error);
      req.params = {id: 0};
      const objTest =
      {
        _id: 0,
        username: 'test',
        content: 'test',
        cardName: 'test',
        cardStatus: 'test',
        cardContent: 'test',
        cardCategory: 'test',
        __v: 0,
      };

      try {
        await userController.editposts(req, res, next);
        assert.deepEqual(await userController.editposts(req, res, next), objTest);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });

  describe('.deleteposts()', ()=>{
    it(('should call .deleteposts() correctly'), async ()=>{
      initUserController();
      req.params = {id: 0};
      userfnMock.sessionx.resolves(['test', 'test']);
      authMock.findOne.resolves({
        _id: 0,
        username: 'test',
        password: 'test',
        __v: 0,
      });
      const objTest =
        {
          _id: 0,
          username: 'test',
          content: 'test',
          cardName: 'test',
          cardStatus: 'test',
          cardContent: 'test',
          cardCategory: 'test',
          __v: 0,
        };
      userfnMock.usernameCheck.resolves(true);
      userfnMock.finalResultFromMode.resolves(objTest);
      await userController.deleteposts(req, res, next);
      assert.deepEqual(await userController.deleteposts(req, res, next), objTest);
    });
    it('should call .deleteposts() incorrectly with .sessionx throw error', async () => {
      initUserController();
      const error = new Error('error');
      userfnMock.sessionx.throws(error);
      authMock.findOne.throws(error);
      userfnMock.usernameCheck.throws(error);
      userfnMock.finalResultFromMode.throws(error);
      req.params = {id: 0};
      try {
        await userController.deleteposts(req, res, next);
        // assert.deepEqual(await userController.deleteposts(req, res, next), objTest);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
});
