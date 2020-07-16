import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sendEmail from '@sendgrid/mail';
import chaiHttp from 'chai-http';
import app from '../src/app';
import UserRepository from '../src/repositories/UserRepository';
import { createToken } from '../src/modules/tokenProcessor';
import { hashPassword } from '../src/utils/hashPassword';

import model from '../src/models';

const { User } = model;
const testUser = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'dieudonneawa7@gmail.com',
  password: hashPassword('workingwithseeds'),
  is_verified: true,
  gender: 'male',
};
chai.use(chaiHttp);

describe('Password reset Tests', () => {
  let resetToken, userId;
  const email = 'dieudonneawa7@gmail.com';
  before(() => {
    sinon.stub(sendEmail, 'send').returnsThis();
    async () => {
      await User.create(testUser);
      const { uuid } = await UserRepository.getOne({ email });
      resetToken = await createToken({ uuid, email });
      userId = uuid;
    };
  });
  after(() => {
    sinon.restore();
  });

  it('"/api/v1/auth/forgot_password" Should send a reset link if email exists and is valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({ email: 'efejustin3@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status').eql('Success');
        expect(res.body).to.have.property('message').eql('A password reset link has been sent to your mailbox');
        done();
      });
  });
  it('"/api/v1/auth/forgot_password" Should fail if email is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('error').eql('email is required');
        done();
      });
  });
  it('"/api/v1/auth/forgot_password" Should fail if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({ email: 'iaminvalidemail.com' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('error').eql('email is not valid');
        done();
      });
  });
  it('"/api/v1/auth/reset_password/:uuid/:token" Should fail if password is not provided', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/reset_password/${userId}/${resetToken}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('error').eql('password is required');
        done();
      });
  });
  it('"/api/v1/auth/reset_password/:uuid/:token" Should fail if password is invalid', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/reset_password/${userId}/${resetToken}`)
      .send({ password: 'nouppercasenordigit' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body.error).eql('password should contain at least one Uppercase letter, one lowercase letter, and at least one digit with now space');
        done();
      });
  });
  it('"/api/v1/auth/reset_password/:uuid/:token" Should fail if password length is less than 8', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/reset_password/${userId}/${resetToken}`)
      .send({ password: 'Nouppe1' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body.error).eql('password should be at least eight characters');
        done();
      });
  });
  it('"/api/v1/auth/reset_password/:uuid/:token" Should pass if token and id matche user token and id', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/reset_password/${userId}/${resetToken}`)
      .send({ password: 'Mynumber1password' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Password Reset Successfully');
        done();
      });
  });
});
