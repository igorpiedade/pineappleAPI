import Order from '../schemas/order';

class OrderController {
     async index(req,res){
        const userId = req.userId;
        const orders = await Order.find({ userId });

        return res.json(orders)
    }

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
        const { wallet, stock, orderType, quantity, price, currency } = req.body;
        const userId = req.userId
        
        if(!order) {
            return res.status(400).json({ error:'Order does not exist'})
        }

        if (userId !== order.userId) {
            return res.status(401).json({ error: 'User not Allowed to change this order'})
        }
        
        
        await order.updateOne({
            wallet,
            stock,
            orderType,
            quantity,
            price,
            currency,
        }) 
        
        return res.json({
            wallet,
            stock,
            orderType,
            quantity,
            price,
            currency,
        });
    }
}

export default new OrderController();

