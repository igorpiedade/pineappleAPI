import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  stock: {
    type: String,
    required: true,
  },

  orderType: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,

  },

} , {
  timestamps: true,
});

export default mongoose.model('Order',orderSchema);

