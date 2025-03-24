const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/productController');
const { AdminGet } = require('../middleware/adminGetMiddleware');
const { Auth } = require('../middleware/authMiddleware');
const productImgs = require('../middleware/productMiddleware');

productRoutes.use(AdminGet);
productRoutes.use(Auth);

productRoutes.get('/', productController.ViewProduct);
productRoutes.get('/add', productController.AddProduct);
productRoutes.get('/editProduct/:_id', productController.EditProduct);
productRoutes.get('/deleteProduct/:_id', productController.DeleteProduct);

productRoutes.post('/addProduct', productImgs.single('image'), productController.SaveProduct);
productRoutes.post('/updateProduct', productImgs.single('image'), productController.UpdateProduct);

module.exports = productRoutes;