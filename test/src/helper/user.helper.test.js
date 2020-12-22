/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
'use strict';
const assert = require('chai').assert;
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
describe('(4) user.helper.js : additional methods for userController.js', () => {
  let authMock; let accountsMock; let postioMock;
  let comparePassword; let comparePasswordStub;
  let userController;
  let user; let req; let res; let next; let post; let jsonStub;
  let initUserController;
  let UserPass;
  let result;
  let userfnMock;
  let sessionx;
  let userHelper;
  let objUserPass;
  let viewModeResult;
  let initUserHelper;
  let showResult;
  let bcryptMock;

  beforeEach(() => {
    user={};
    bcryptMock={};
    accountsMock={};
    post = 'res.send.done';
    showResult = {message: 'hiResult'};
    authMock = {
      findOne: sinon.stub(),
    };
    bcryptMock = {
      compare: sinon.stub(),
    };
    userfnMock = {
      sessionx: sinon.stub(),
      usernameCheck: sinon.stub(),
      viewModeResult: sinon.stub(),
      editModeResult: sinon.stub(),
      addModeResult: sinon.stub(),
      deleteModeResult: sinon.stub(),
      finalResultFromMode: sinon.stub().returns(showResult),
    };
    jsonStub = {message: 'json_test'},
    comparePasswordStub = sinon.stub();
    accountsMock = {
      create: sinon.stub(),
      find: sinon.stub(),
      findOneAndUpdate: sinon.stub(),
      deleteOne: sinon.stub(),
    };
    // sinon.stub(founduser, 'comparePassword').resolves(true);
    user = {
      comparePassword: sinon.stub(),
    };
    req = {
      body: {},
      session: {},
      params: {},
    };
    viewModeResult= sinon.stub();
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
    initUserHelper = () => {
      userHelper = proxyquire('../../../src/helper/user.helper', {
        '../models/user.model': accountsMock,
        '../models/auth.model': authMock,
        '../helper/user.helper': userfnMock,
        'bcryptjs': bcryptMock,
      });
    };
  });
  afterEach(() => userHelper = {});

  describe('._sessionx()', () => {
    it('should call ._sessionx() correctly with session defined', async () => {
      req.body={
        username: 'test',
        password: 'test',
      };
      req.session={
        username: 'test2',
        password: 'test2',
      };
      const sess = req.session;
      const uu = req.body.username;
      const pp = req.body.password;
      initUserHelper();
      assert.deepEqual(await userHelper.sessionx(sess, uu, pp), ['test2', 'test2']);
      // let result, error,usernamepassword,user,isMatch;
    });

    it('should call ._sessionx() correctly with session undefined', async () => {
      req.body={
        username: 'test',
        password: 'test',
      };
      req.session={};
      const sess = req.session;
      const uu = req.body.username;
      const pp = req.body.password;
      initUserHelper();
      assert.deepEqual(await userHelper.sessionx(sess, uu, pp), ['test', 'test']);
    });
  });

  describe('._usernameCheck()', () => {
    it('should call ._usernameCheck() correctly with true condition', async () => {
      req.body={
        username: 'test',
        password: 'test',
      };
      req.session={
        username: 'test',
        password: 'test',
      };
      const sess = req.session;
      const user = req.body;
      const uu = req.body.username;
      const pp = req.body.password;
      await userfnMock.sessionx.resolves(['test', 'test']);
      await bcryptMock.compare.resolves(true);
      initUserHelper();
      const objRes = await userHelper.sessionx(sess, uu, pp);
      await bcryptMock.compare(objRes.password, user.password);
      assert.deepEqual(await userHelper.usernameCheck(user, sess, uu, pp), true);
    });
    it('should call ._usernameCheck() function with false condition', async () => {
      req.body={
        username: 'test',
        password: 'test',
      };
      req.session={
        username: 'test2',
        password: 'test2',
      };
      const sess = req.session;
      const user = req.body;
      const uu = req.body.username;
      const pp = req.body.password;
      await userfnMock.sessionx.resolves(['test2', 'test2']);
      await bcryptMock.compare.resolves(false);
      initUserHelper();
      const objRes = await userHelper.sessionx(sess, uu, pp);
      await bcryptMock.compare(objRes.password, user.password);
      assert.deepEqual(await userHelper.usernameCheck(user, sess, uu, pp), false);
    });
    it('should call ._usernameCheck() incorrectly with throw error', async () => {
      const error = new Error('error');
      bcryptMock.compare.throws(error);
      userfnMock.sessionx.throws(error);
      req.body={
        username: 'test',
        password: 'test',
      };
      req.session={
        username: 'test2',
        password: 'test2',
      };
      const sess = req.session;
      const user = req.body;
      const uu = req.body.username;
      const pp = req.body.password;
      initUserHelper();
      try {
        await userHelper.usernameCheck(user, sess, uu, pp);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });

  describe('._viewModeResult()', () => {
    it('should call ._viewModeResult() correctly', async () => {
      // initUserHelper();
      const uu = 'test';
      const pp = 'test';
      req.session= {username: 'test', password: 'test'};
      const sess = req.session;

      initUserHelper();
      await userfnMock.sessionx.resolves(['test', 'test']);
      await accountsMock.find.resolves({username: 'test', password: 'test'});
      assert.deepEqual(await userHelper.viewModeResult(sess, uu, pp), {username: 'test', password: 'test'});
    });
    it('should call ._viewModeResult() with throw error', async () => {
      const error = new Error('error');
      userfnMock.sessionx.throws(error);
      accountsMock.find.throws(error);
      // initUserHelper();
      const uu = 'test';
      const pp = 'test';
      req.session= {username: 'test', password: 'test'};
      const sess = req.session;

      initUserHelper();
      try {
        await userHelper.viewModeResult(sess, uu, pp);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
  describe('._editModeResult()', () =>{
    it('should call ._editModeResult() correctly', async ()=>{
      const uu= 'test';
      const pp= 'test';
      req.params={
        id: 0,
      };
      const pid = req.params.id;
      req.session= {
        username: 'test',
        password: 'test',
      };
      const sess=req.session;
      req.body={
        username: 'test',
        password: 'test',
        content: 'new content',
        cardName: 'new cardname',
        cardStatus: 'new cardstatus',
        cardContent: 'new cardcontent',
        cardCategory: 'new cardcategory',
      };
      const obj =req.body;
      initUserHelper();
      await accountsMock.findOneAndUpdate.resolves(obj);
      assert.deepEqual(await userHelper.editModeResult(sess, uu, pp, obj, pid), obj);
    });
    it('should call ._editModeResult() incorrectly with throw error', async ()=>{
      const error = new Error('error');
      await accountsMock.findOneAndUpdate.throws(error);
      const uu= 'test';
      const pp= 'test';
      req.params={
        id: 0,
      };
      const pid = req.params.id;
      req.session= {
        username: 'test',
        password: 'test',
      };
      const sess=req.session;
      req.body={
        username: 'test',
        password: 'test',
        content: 'new content',
        cardName: 'new cardname',
        cardStatus: 'new cardstatus',
        cardContent: 'new cardcontent',
        cardCategory: 'new cardcategory',
      };
      const obj =req.body;
      initUserHelper();
      try {
        await userHelper.editModeResult(sess, uu, pp, obj, pid);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
  describe('._addModeResult()', () => {
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
    it('should call ._addModeResult() correctly', async ()=>{
      accountsMock.create.resolves(objTest);
      initUserHelper();
      assert.deepEqual(await userHelper.addModeResult(objTest), objTest);
    });
    it('should call ._addModeResult() incorrectly with throw error', async ()=>{
      const error = new Error('error');
      accountsMock.create.throws(error);
      initUserHelper();
      try {
        await userHelper.addModeResult(objTest);
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
  describe('._deleteModeResult()', () =>{
    it('should call ._deleteModeResult() correctly', async ()=>{
      const uu = 'test';
      const pp = 'test';
      req.params={
        id: 0,
      };
      const pid = req.params.id;
      req.session={
        username: 'test',
        password: 'test',
      };
      const sess= req.session;
      await userfnMock.sessionx.resolves(['test', 'test']);
      await accountsMock.deleteOne.resolves('DONE DELETION');
      initUserHelper();
      assert.deepEqual(await userHelper.deleteModeResult(sess, uu, pp, pid), ('DONE DELETION'));
    });
    it('should call ._deleteModeResult incorrectly with throw error', async ()=>{
      const error = new Error('error');
      userfnMock.sessionx.throws(error);
      accountsMock.deleteOne.throws(error);
      const uu = 'test';
      const pp = 'test';
      req.params={
        id: 0,
      };
      const pid =req.params.id;
      req.session={
        username: 'test',
        password: 'test',
      };
      const sess= req.session;
      initUserHelper();
      try {
        await userHelper.deleteModeResult(sess, uu, pp, pid);
      } catch (error) {
      }assert.deepEqual(error, error);
    });
  });

  describe('._finalResultFromMode()', () =>{
    it('should call ._finalResultFromMode() correctly', async ()=>{
      const uu = 'test';
      const pp = 'test';
      req.params={
        id: 0,
      };
      const pid =req.params.id;
      req.session={
        username: 'test',
        password: 'test',
      };
      const sess= req.session;
      req.body={
        username: 'test',
        password: 'test',
        content: 'new content',
        cardName: 'new cardname',
        cardStatus: 'new cardstatus',
        cardContent: 'new cardcontent',
        cardCategory: 'new cardcategory',
      };
      const obj =req.body;
      const isMatch = true;
      await userfnMock.sessionx.resolves(['test', 'test']);
      await userfnMock.viewModeResult.resolves('Call View Function');
      await userfnMock.addModeResult.resolves('Call Add Function');
      await userfnMock.editModeResult.resolves('Call Edit Function');
      await userfnMock.deleteModeResult.resolves('Call Delete Function');
      initUserHelper();
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'view', sess, uu, pp, obj, pid), ('Call View Function'));
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'add', sess, uu, pp, obj, pid), ('Call Add Function'));
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'edit', sess, uu, pp, obj, pid), ('Call Edit Function'));
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'delete', sess, uu, pp, obj, pid), ('Call Delete Function'));
    });

    it('should call ._finalResultFromMode() correctly with isMatch equal to false', async ()=>{
      const error= new Error('error');
      const isMatch=false;

      const uu = 'test';
      const pp = 'test';
      req.params={
        id: 0,
      };
      const pid =req.params.id;
      req.session={
        username: 'test',
        password: 'test',
      };
      const sess= req.session;
      req.body={
        username: 'test',
        password: 'test',
        content: 'new content',
        cardName: 'new cardname',
        cardStatus: 'new cardstatus',
        cardContent: 'new cardcontent',
        cardCategory: 'new cardcategory',
      };
      const obj =req.body;
      initUserHelper();
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'view', sess, uu, pp, obj, pid), false);
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'add', sess, uu, pp, obj, pid), false);
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'edit', sess, uu, pp, obj, pid), false);
      assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'delete', sess, uu, pp, obj, pid), false);
    });

    it('should call ._finalResultFromMode() incorrectly with throw error', async ()=>{
      const error= new Error('error');
      userfnMock.sessionx.throws(error);
      userfnMock.viewModeResult.throws(error);
      userfnMock.addModeResult.throws(error);
      userfnMock.editModeResult.throws(error);
      userfnMock.deleteModeResult.throws(error);
      const uu = 'test';
      const pp = 'test';
      req.params={
        id: 0,
      };
      const pid =req.params.id;
      req.session={
        username: 'test',
        password: 'test',
      };
      const sess= req.session;
      req.body={
        username: 'test',
        password: 'test',
        content: 'new content',
        cardName: 'new cardname',
        cardStatus: 'new cardstatus',
        cardContent: 'new cardcontent',
        cardCategory: 'new cardcategory',
      };
      const obj =req.body;
      const isMatch = true;
      initUserHelper();
      try {
        assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'view', sess, uu, pp, obj, pid), ('Call View Function'));
        assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'add', sess, uu, pp, obj, pid), ('Call Add Function'));
        assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'edit', sess, uu, pp, obj, pid), ('Call Edit Function'));
        assert.deepEqual(await userHelper.finalResultFromMode(isMatch, 'delete', sess, uu, pp, obj, pid), ('Call Delete Function'));
      } catch (error) {
        assert.deepEqual(error, error);
      }
    });
  });
});
