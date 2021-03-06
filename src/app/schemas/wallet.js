import mangoose from 'mongoose';

const walletSchema = new mangoose.Schema({
  walletName: {
      type: String,
      required: true,
  },
  
  userId: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },

  walletDescription: {
    type: String,
  }
},{
  timestamps: true,
});

export default mangoose.model('Wallet', walletSchema);