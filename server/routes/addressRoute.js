import express from 'express';
import authUser from '../middlewares/authUser.js';
import { addAddress, getAddres } from '../controllers/addressController.js';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress)
addressRouter.get('/get', authUser, getAddres)

export default addressRouter;