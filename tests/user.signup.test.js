import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
// import { createToken } from '../src/modules/tokenProcessor';

chai.use(chaiHttp);

// after(() => User.destroy({ where: {}, force: true }));
describe('User', () => {
  // let newUserToken, newUserUuid, verifiedUserToken, verifiedUserUuid;
  // before(async () => {
  //   newUserToken = await createToken({
  //     uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
  //     email: 'somemail@yahoo.com'
  //   });
  //   verifiedUserToken = await createToken({
  //     uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
  //     email: 'Jessica_Bins@hotmail.com'
  //   });
  // });
  it('Should return success for signup POST: /auth/signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'efejuskltin3@gmail.com',
        firstName: 'Justinsdfgsdg',
        lastName: 'Igugudfgsdf',
        password: 'Djkladjdfj129',
      })
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('success');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should display an error message of first_name or last name is required field is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.all.keys('first_name', 'last_name', 'email', 'password');
        done();
      });
  });

  it('Should display an error message of first_name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        first_name: 'bles33',
        password: 'Blesn sing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('first_name');
        done();
      });
  });

  it('Should display an error message of last_name should contain only alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        last_name: 'Gift7',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('last_name');
        done();
      });
  });

  it('Should display an error message of password should be at least eight characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'Abobo',
        password: 'Bless',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('password');
        done();
      });
  });

  it('Should display an error message of password should contain at least one Uppercase letter, one lowercase letter, and at least one digit', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail.com',
        name: 'Gift',
        password: 'Blessing',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('password');
        done();
      });
  });

  it('Should display an error message of email should be of the form; example@ymail.com', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'giftabobo@gmail',
        name: 'Gift',
        password: 'Blessing9',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.eql('error');
        expect(res.body.error).to.have.property('email');
        done();
      });
  });
});
