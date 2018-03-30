import * as express from 'express';
import UserController from '../controllers/userController';

const user = express.Router();

user.get('/',  UserController.list);
user.post('/',  UserController.create);
user.delete('/',  UserController.deleteAll);

export default user;
