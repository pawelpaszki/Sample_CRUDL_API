import * as express from 'express';
import UserController from '../controllers/userController';

const user = express.Router();

user.get('/',  UserController.list);

export default user;
