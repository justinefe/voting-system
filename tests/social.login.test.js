import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// import { req, res } from './mock.data';
import authController from '../src/controllers/AuthController';
import userRepository from '../src/repositories/UserRepository';

chai.use(sinonChai);

chai.use(chaiHttp);

describe('User social login tests', () => {
  const next = sinon.stub();
  before(() => {
    sinon.createStubInstance(authController.social(next), () => { sinon.stub().retursThis(); });
  });
  after(() => {
    sinon.restore();
  });
  it('it should trigger error handler for server errors', () => {
    sinon.stub(userRepository, 'getOne').throws();
    // authController.social(req, Response, next);
    expect(next.called).to.be.true;
    // userRepository.getOne.restore();
  });
});
