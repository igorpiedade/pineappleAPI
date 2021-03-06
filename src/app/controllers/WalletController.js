import Wallet from '../schemas/wallet';

class WalletController{
    async store (req, res) {
      const { walletName, walletDescription, currency } = req.body;
      const userId = req.userId;

      const walletExists = await Wallet.findOne({ walletName, userId });

      if(walletExists) {
        return res.status(400).json({error: 'This wallet already exists' });
      }

      await Wallet.create({ 
        walletName,
        walletDescription,
        userId,
        currency,
      });

      return res.json({ 
        walletName,
        walletDescription,
        userId,
        currency,
      });
    }

    async index (req, res) {
      const wallets = await Wallet.find({ userId: req.userId })

      return res.json({ wallets });
    }

    async uptade (req, res) {
      const { walletName, walletDescription, currency, walletId } = req.body;
      const userId = req.userId;

      const wallet = await Wallet.findById({ _id: walletId });

      if (!wallet) {
        return res.status(400).json({ error: "Wallet does not exist!"});
      }

      if(userId !== wallet.userId) {
        return res.status(400).json({ error: 'User not allowed to change this wallet!'})
      }

      await wallet.updateOne({
          walletName,
          walletDescription,
          currency,
      });

      return res.json({ 
        walletName,
        walletDescription,
        currency,
       });
    }

    async delete (req, res) {

      const { walletId } = req.body;
      const userId = req.userId;

      const wallet = await Wallet.findById({ _id: walletId });

      if (!wallet) {
        return res.status(400).json({ error: "Wallet does not exist!"});
      }

      if(wallet.userId !== userId) {
        return res.status(400).json({ error: "User not allowed to delete this wallet!"})
      }

      await Wallet.findByIdAndDelete({ _id: walletId });

      return res.json({ message: "Wallet deleted!" });
    }
}

export default new WalletController();