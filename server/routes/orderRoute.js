import express from 'express'
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, updateOrderStatus } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();
 {/*----- USER ROUTES ----*/}
// Place order (COD)
orderRouter.post('/cod', authUser, placeOrderCOD)
// Get user's orders
orderRouter.get('/user', authUser, getUserOrders)
// Place order (Stripe Online Payment)
orderRouter.post('/stripe', authUser, placeOrderStripe)
// Get all orders for seller / admin
{/*----- SELLER / ADMIN ----*/}
orderRouter.get('/seller', authSeller, getAllOrders)
// Update order status
orderRouter.post("/update-status", authSeller, updateOrderStatus);
export default orderRouter;