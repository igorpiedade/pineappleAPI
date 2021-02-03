import bcrypt from 'bcryptjs';

import User from '../schemas/user';

class UserController {
    async store(req, res){

      const { userName, firstName, lastName, email, password } = req.body;

      const userExists = await User.findOne({ userName });
      if(userExists) {
          return res.status(400).json({ error: 'User already exists.' });
        }
     
      const emailExists = await User.findOne({ email });
      if(emailExists) {
          return res.status(400).json({ error: 'E-mail already registred.' });
        }

      const password_hash = bcrypt.hashSync(password,6);
      
      await User.create({
          userName,
          firstName,
          lastName,
          email,
          password_hash: password_hash,
      });
      return res.json({
          userName,
          firstName,
          lastName,
          email,
      });

    }

    async update(req, res){
        
        const user = await User.findById(req.userId);
        const { userName, firstName, lastName, email, password, newPassword } = req.body;

        if ( email !== user.email ){
           
          const emailExists = await User.findOne({ email });

           if(emailExists) {
              return res.status(400).json({ error: 'E-mail already registred.' });
            }  
        }

        if (newPassword && !(await bcrypt.compare(password, user.password_hash) ) ) {
              return res.status(400).json({ error: 'Password does not match' });
        }

        const password_hash = bcrypt.hashSync(newPassword,6); 

        await user.updateOne({
          userName,
          firstName,
          lastName,
          email,
          password_hash: password_hash,
        });

        return res.json({
            userName,
            firstName,
            lastName,
            email,
        });
    }

    async delete(req, res){
      const { userName, password } = req.body;

      const user = await User.findById(req.userId);

      if ( user.userName !== userName) {
            return res.status(400).json({ error: 'User does note match'})
      }

      if (!(await bcrypt.compare(password, user.password_hash))){
            return res.status(401).json({ error: 'Password does note match'})
      }

      const deleteUser = await User.findByIdAndDelete(req.userId);

      return res.json( `User deleted` );
    }

}

export default new UserController();