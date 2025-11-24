import express from "express";
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

// Update Cart API
cartRouter.post('/update', authUser, updateCart)

export default cartRouter;