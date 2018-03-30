import { Request, Response } from 'express';
import { User } from '../models/user';

class UserController {

  public list = async (req: Request, res: Response) => {
    const users = await User.find({}).exec();
    return res.status(200).json({
      users,
    });
  }

  public getOne = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId).exec();
      if(!user) {
        return res.status(404).json({
          error: 'User not found: ' + userId,
        });
      } else {
        return res.status(200).json({
          user,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: 'Unable to get user: ' + userId,
      });
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      let user = await User.findById(req.params.id).exec();
      user.username = req.body.username;
      await user.save();
      return res.status(201).json({
        user
      });
    } catch (err) {
      return res.status(403).json({
        error: 'Unable to update user'
      });
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json({
        user
      });
    } catch (err) {
      return res.status(403).json({
        error: 'Unable to create new user'
      });
    }
  }

  public deleteAll = async (req: Request, res: Response) => {
    await User.deleteMany({});
    return res.status(200).json({
      message: 'All users deleted successfully'
    });
  }

  public delete = async (req: Request, res: Response) => {
    const userId = req.params.id;
    await User.findByIdAndRemove(userId);
    return res.status(200).json({message: 'User deleted successfully: ' + userId});
  }

}

export default new UserController();
