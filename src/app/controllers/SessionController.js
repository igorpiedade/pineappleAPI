import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../schemas/user';


class SessionController {
  async store(req, res){
      const { userName, password}  = req.body;

      const  user = await User.findOne({ userName });

      if (!user) {
          return res.status(401).json({ error: 'User not found' });
      }

      if ( await bcrypt.compare(password, user.password_hash) ){
          
            const { _id, firstName, lastName, email } = user;

            return res.json({
                user: {
                    _id,
                    firstName,
                    lastName,
                    email,
                },
                token: jwt.sign( { _id }, process.env.SECRET_HASH, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                }),
            });
          
      } else {
          return res.status(401).json({ error: 'Invalid Password'});
      }

  }
}
export default new SessionController();