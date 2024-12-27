import addToCart from '../controllers/addToCart.js';
import checkout from '../controllers/checkout.js';
import express from 'express';

const orderRouter = express.Router();

orderRouter.post('/addtocart',addToCart);
orderRouter.post('/checkout',checkout);

export default orderRouter;