import express from '../src/config/app';
const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);
const should = chai.should();
const endpoint: string = '/api/users';
const username: string = 'username';
const password: string = 'password';
const expect = chai.expect;
const testUser: any = {
  "gender": "female",
  "name": {
    "title": "miss",
    "first": "alison",
    "last": "reid"
  },
  "location": {
    "street": "1097 the avenue",
    "city": "Newbridge",
    "state": "ohio",
    "zip": 28782
  },
  "email": "alison.reid@example.com",
  "username": "tinywolf709",
  "password": "rockon",
  "salt": "lypI10wj",
  "md5": "bbdd6140e188e3bf68ae7ae67345df65",
  "sha1": "4572d25c99aa65bbf0368168f65d9770b7cacfe6",
  "sha256": "ec0705aec7393e2269d4593f248e649400d4879b2209f11bb2e012628115a4eb",
  "registered": 1237176893,
  "dob": 932871968,
  "phone": "031-541-9181",
  "cell": "081-647-4650",
  "PPS": "3302243T",
  "picture": {
    "large": "https://randomuser.me/api/portraits/women/60.jpg",
    "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
  }
}

describe('# User', () => {

  before((done) => {
    chai.request(express)
      .delete(endpoint)
      .end(() => {
        done();
      });
  });

  describe('/POST user', () => {
    it('it should create a user', (done) => {
      chai.request(express)
        .post(endpoint)
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          expect(res.body.user.name.first).to.be.a('string');
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should not create the same user twice (unique PPS and username)', (done) => {
      chai.request(express)
        .post(endpoint)
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('error').eql('Unable to create new user');
          done();
        });
    });
  });

  describe('/GET users', () => {
    it('it should return the list of users', (done) => {
      chai.request(express)
        .get(endpoint)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.users.length).to.eql(1);
          done();
        });
    });
  });

  describe('/DELETE users', () => {
    it('it should delete all users', (done) => {
      chai.request(express)
        .delete(endpoint)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('All users deleted successfully');
          done();
        });
    });
  });

  describe('/GET non-existent route', () => {
    it('it should return 404 error', (done) => {
      chai.request(express)
        .get(endpoint + 'non-existent')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').eql('path doesn\'t exist');
          done();
        });
    });
  });
});


