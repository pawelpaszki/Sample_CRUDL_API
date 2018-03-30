import * as express from 'express';
import UserController from '../controllers/userController';

const user = express.Router();

user.get('/',  UserController.list);
user.get('/:id',  UserController.getOne);
user.post('/',  UserController.create);
user.delete('/:id',  UserController.delete);
user.delete('/',  UserController.deleteAll);

export default user;
