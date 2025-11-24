import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// SELLER PROTECTED ROUTES
productRouter.post('/add', upload.array(["images"]), authSeller, addProduct)
productRouter.post('/stock', authSeller, changeStock)
// PUBLIC ROUTES
productRouter.get('/list', productList)
productRouter.get('/id', productById)


export default productRouter;

