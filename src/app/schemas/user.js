import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
      type: String,
      required: true,

    },
  firstName: {
      type: String,
      requised: true,
  },
  lastName: {
    type: String,
    requised: true,
},
  email: {
      type: String,
      required: true,
  },
  password_hash: {
      type: String,
      required: true,
  }
} , {
  timestamps: true,
});

export default mongoose.model('User', userSchema);