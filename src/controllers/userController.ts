import { Request, Response } from 'express';

class UserController {

  public list = async (req: Request, res: Response) => {
    res.status(200).json({
      'users': []
    });
  }

}

export default new UserController();
