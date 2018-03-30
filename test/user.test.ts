import express from '../src/config/app';
const chaiHttp = require('chai-http');
const chai = require('chai');
chai.use(chaiHttp);
const should = chai.should();
const endpoint: string = '/api/users/';
const username: string = 'username';
const password: string = 'password';
const expect = chai.expect;
let userID: string = '';
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
          userID = res.body.user._id;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          expect(res.body.user.gender).to.be.a('string');
          expect(res.body.user.gender).to.eql('female');
          expect(res.body.user.name.title).to.be.a('string');
          expect(res.body.user.name.title).to.eql('miss');
          expect(res.body.user.name.first).to.be.a('string');
          expect(res.body.user.name.first).to.eql('alison');
          expect(res.body.user.name.last).to.be.a('string');
          expect(res.body.user.name.last).to.eql('reid');
          expect(res.body.user.location.street).to.be.a('string');
          expect(res.body.user.location.street).to.eql('1097 the avenue');
          expect(res.body.user.location.city).to.be.a('string');
          expect(res.body.user.location.city).to.eql('Newbridge');
          expect(res.body.user.location.state).to.be.a('string');
          expect(res.body.user.location.state).to.eql('ohio');
          expect(res.body.user.location.zip).to.eql('28782');
          expect(res.body.user.email).to.be.a('string');
          expect(res.body.user.email).to.eql('alison.reid@example.com');
          expect(res.body.user.username).to.be.a('string');
          expect(res.body.user.username).to.eql('tinywolf709');
          expect(res.body.user.password).to.be.a('string');
          expect(res.body.user.password).to.eql('rockon');
          expect(res.body.user.salt).to.be.a('string');
          expect(res.body.user.salt).to.eql('lypI10wj');
          expect(res.body.user.md5).to.be.a('string');
          expect(res.body.user.md5).to.eql('bbdd6140e188e3bf68ae7ae67345df65');
          expect(res.body.user.sha1).to.be.a('string');
          expect(res.body.user.sha1).to.eql('4572d25c99aa65bbf0368168f65d9770b7cacfe6');
          expect(res.body.user.cell).to.be.a('string');
          expect(res.body.user.cell).to.eql('081-647-4650');
          expect(res.body.user.PPS).to.be.a('string');
          expect(res.body.user.PPS).to.eql('3302243T');
          expect(res.body.user.picture.large).to.be.a('string');
          expect(res.body.user.picture.large).to.eql('https://randomuser.me/api/portraits/women/60.jpg');
          expect(res.body.user.picture.medium).to.be.a('string');
          expect(res.body.user.picture.medium).to.eql('https://randomuser.me/api/portraits/med/women/60.jpg');
          expect(res.body.user.picture.thumbnail).to.be.a('string');
          expect(res.body.user.picture.thumbnail).to.eql('https://randomuser.me/api/portraits/thumb/women/60.jpg');
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
    it('it should return a list of users', (done) => {
      chai.request(express)
        .get(endpoint)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('users');
          expect(res.body.users.length).to.eql(1);
          done();
        });
    });
  });

  describe('/PUT user', () => {
    it('it should update a single user', (done) => {
      const username: string = 'crazybear293';
      chai.request(express)
        .put(endpoint + userID)
        .send({username})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('user');
          console.log(res.body.user);
          expect(res.body.user.gender).to.be.a('string');
          expect(res.body.user.gender).to.eql('female');
          expect(res.body.user.name.title).to.be.a('string');
          expect(res.body.user.name.title).to.eql('miss');
          expect(res.body.user.name.first).to.be.a('string');
          expect(res.body.user.name.first).to.eql('alison');
          expect(res.body.user.name.last).to.be.a('string');
          expect(res.body.user.name.last).to.eql('reid');
          expect(res.body.user.location.street).to.be.a('string');
          expect(res.body.user.location.street).to.eql('1097 the avenue');
          expect(res.body.user.location.city).to.be.a('string');
          expect(res.body.user.location.city).to.eql('Newbridge');
          expect(res.body.user.location.state).to.be.a('string');
          expect(res.body.user.location.state).to.eql('ohio');
          expect(res.body.user.location.zip).to.eql('28782');
          expect(res.body.user.email).to.be.a('string');
          expect(res.body.user.email).to.eql('alison.reid@example.com');
          expect(res.body.user.username).to.be.a('string');
          expect(res.body.user.username).to.eql('crazybear293');
          expect(res.body.user.password).to.be.a('string');
          expect(res.body.user.password).to.eql('rockon');
          expect(res.body.user.salt).to.be.a('string');
          expect(res.body.user.salt).to.eql('lypI10wj');
          expect(res.body.user.md5).to.be.a('string');
          expect(res.body.user.md5).to.eql('bbdd6140e188e3bf68ae7ae67345df65');
          expect(res.body.user.sha1).to.be.a('string');
          expect(res.body.user.sha1).to.eql('4572d25c99aa65bbf0368168f65d9770b7cacfe6');
          expect(res.body.user.cell).to.be.a('string');
          expect(res.body.user.cell).to.eql('081-647-4650');
          expect(res.body.user.PPS).to.be.a('string');
          expect(res.body.user.PPS).to.eql('3302243T');
          expect(res.body.user.picture.large).to.be.a('string');
          expect(res.body.user.picture.large).to.eql('https://randomuser.me/api/portraits/women/60.jpg');
          expect(res.body.user.picture.medium).to.be.a('string');
          expect(res.body.user.picture.medium).to.eql('https://randomuser.me/api/portraits/med/women/60.jpg');
          expect(res.body.user.picture.thumbnail).to.be.a('string');
          expect(res.body.user.picture.thumbnail).to.eql('https://randomuser.me/api/portraits/thumb/women/60.jpg');
          done();
        });
    });
  });

  describe('/PUT user', () => {
    it('it should return an error due to invalid id', (done) => {
      const username: string = 'crazybear293';
      chai.request(express)
        .put(endpoint + '1234abcd1234')
        .send({username})
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('/GET user', () => {
    it('it should return a single user', (done) => {
      chai.request(express)
        .get(endpoint + userID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          expect(res.body.user.gender).to.be.a('string');
          expect(res.body.user.gender).to.eql('female');
          expect(res.body.user.name.title).to.be.a('string');
          expect(res.body.user.name.title).to.eql('miss');
          expect(res.body.user.name.first).to.be.a('string');
          expect(res.body.user.name.first).to.eql('alison');
          expect(res.body.user.name.last).to.be.a('string');
          expect(res.body.user.name.last).to.eql('reid');
          expect(res.body.user.location.street).to.be.a('string');
          expect(res.body.user.location.street).to.eql('1097 the avenue');
          expect(res.body.user.location.city).to.be.a('string');
          expect(res.body.user.location.city).to.eql('Newbridge');
          expect(res.body.user.location.state).to.be.a('string');
          expect(res.body.user.location.state).to.eql('ohio');
          expect(res.body.user.location.zip).to.eql('28782');
          expect(res.body.user.email).to.be.a('string');
          expect(res.body.user.email).to.eql('alison.reid@example.com');
          expect(res.body.user.username).to.be.a('string');
          expect(res.body.user.username).to.eql('crazybear293');
          expect(res.body.user.password).to.be.a('string');
          expect(res.body.user.password).to.eql('rockon');
          expect(res.body.user.salt).to.be.a('string');
          expect(res.body.user.salt).to.eql('lypI10wj');
          expect(res.body.user.md5).to.be.a('string');
          expect(res.body.user.md5).to.eql('bbdd6140e188e3bf68ae7ae67345df65');
          expect(res.body.user.sha1).to.be.a('string');
          expect(res.body.user.sha1).to.eql('4572d25c99aa65bbf0368168f65d9770b7cacfe6');
          expect(res.body.user.cell).to.be.a('string');
          expect(res.body.user.cell).to.eql('081-647-4650');
          expect(res.body.user.PPS).to.be.a('string');
          expect(res.body.user.PPS).to.eql('3302243T');
          expect(res.body.user.picture.large).to.be.a('string');
          expect(res.body.user.picture.large).to.eql('https://randomuser.me/api/portraits/women/60.jpg');
          expect(res.body.user.picture.medium).to.be.a('string');
          expect(res.body.user.picture.medium).to.eql('https://randomuser.me/api/portraits/med/women/60.jpg');
          expect(res.body.user.picture.thumbnail).to.be.a('string');
          expect(res.body.user.picture.thumbnail).to.eql('https://randomuser.me/api/portraits/thumb/women/60.jpg');
          done();
        });
    });
  });

  describe('/GET user', () => {
    it('it should not return a user with non-existent id', (done) => {
      const reversedUserID: string = userID.split('').reverse().join('');
      chai.request(express)
        .get(endpoint + reversedUserID)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error').eql('User not found: ' + reversedUserID);
          done();
        });
    });
  });

  describe('/GET user', () => {
    it('it should return 500 error due to too long id', (done) => {
      const reversedUserID: string = userID.split('').reverse().join('');
      chai.request(express)
        .get(endpoint + userID + 'a')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('error').eql('Unable to get user: ' + userID + 'a');
          done();
        });
    });
  });

  describe('/DELETE user', () => {
    it('it should delete an existing user', (done) => {
      chai.request(express)
        .delete(endpoint + userID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('User deleted successfully: ' + userID);
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
        .get('non-existent')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});


