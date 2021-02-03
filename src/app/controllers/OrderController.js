import Order from '../schemas/order';

class OrderController {
     async store(req, res) {

      const userId = req.userId
      const { wallet, stock, orderType, quantity, price, currency } = req.body;
      
      const totalAmount = quantity * price;

      await Order.create ({
          wallet,
          userId,
          stock,
          orderType,
          quantity,
          price,
          currency,
          amount: totalAmount,

      });

      return res.json({ 
          wallet,
          stock,
          orderType,
          quantity,
          price,
          currency,
          totalAmount,
      })
    }
    
     async update(req, res){

        const order = await Order.findById(req.body.orderId);
        const userId = req.userId
        
        if(!order) {
            return res.status(400).json({ error:'Order does not exist'})
        }

        if (userId !== order.userId) {
            return res.status(401).json({ error: 'User not Allowed to change this order'})
        }
        
        return res.json({ message: 'OK' })
    }
}

export default new OrderController();

