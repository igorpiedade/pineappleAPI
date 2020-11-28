import bcrypt from 'bcryptjs';

import User from '../schemas/user';

class UserController {
    async store(req, res){
      
      const userData = req.body;

      const password_hash = bcrypt.hashSync(userData.password,6);
      
      await User.create({
          userName: userData.userName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password_hash: password_hash,
      });

      return res.json(User);

    }
}

export default new UserController();