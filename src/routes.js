import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import OrderController from './app/controllers/OrderController';
import WalletController from './app/controllers/WalletController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users', authMiddleware, UserController.delete), 

routes.post('/sessions', SessionController.store);

routes.post('/orders', authMiddleware, OrderController.store);
routes.put('/orders', authMiddleware, OrderController.update);
routes.get('/orders', authMiddleware, OrderController.index);
routes.delete('/orders',authMiddleware, OrderController.delete);

routes.post('/wallets', authMiddleware, WalletController.store);
routes.put('/wallets', authMiddleware, WalletController.uptade);
routes.get('/wallets', authMiddleware, WalletController.index);
routes.delete('/wallets', authMiddleware, WalletController.delete);



export default routes;
