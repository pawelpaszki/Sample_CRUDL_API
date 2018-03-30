import { Request, Response } from 'express';
import { User } from '../models/user';

class UserController {

  public list = async (req: Request, res: Response) => {
    res.status(200).json({
      users: [],
    });
  }

  public create = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json(
        {message: 'User created successfully', user});
    } catch (err) {
      return res.status(403).json({error: 'Unable to create new user'});
    }
  }

}

export default new UserController();
