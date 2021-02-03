import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users', authMiddleware, UserController.delete), 

routes.post('/sessions', SessionController.store);

routes.post('/orders', authMiddleware, OrderController.store);
routes.put('/orders', authMiddleware, OrderController.update);



export default routes;
