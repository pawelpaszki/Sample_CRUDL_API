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
        {user});
    } catch (err) {
      return res.status(403).json({error: 'Unable to create new user'});
    }
  }

  public deleteAll = async (req: Request, res: Response) => {
    await User.deleteMany({});
    return res.status(200).json({message: 'All users deleted successfully'});
  }

}

export default new UserController();
