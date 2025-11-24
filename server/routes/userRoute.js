import express from 'express';
import { isUserAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
 
const userRouter = express.Router();
//PUBLIC ROUTES
userRouter.post('/register', register) // Create new user
userRouter.post('/login', login) // Login user
//PROTECTED ROUTES
userRouter.get('/is-auth', authUser, isUserAuth) // Validate authenticated user
userRouter.get('/logout', authUser, logout) // Logout user

export default userRouter