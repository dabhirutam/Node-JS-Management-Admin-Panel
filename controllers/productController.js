const productModel = require("../models/productModal");
const fs = require('fs');

const ViewProduct = async (req, res) => {
    const products = await productModel.find();

    res.render('productComponents/products', { products });
}

const AddProduct = (req, res) => {
    res.render('productComponents/addProduct');
}

const SaveProduct = async (req, res) => {
    const { name, price, description, category, stockQuantity, adminID } = req.body;

    const product = new productModel({
        adminID,
        name,
        price,
        description,
        category,
        stockQuantity,
        image: req.file.path
    });

    await product.save();

    console.log("Product is created..");

    res.redirect('/products');
}

const EditProduct = async (req, res) => {
    const product = await productModel.findById(req.params._id);

    res.render('productComponents/editProduct', { product });
}

const UpdateProduct = async (req, res) => {
    const { image } = await productModel.findById(req.body._id);
    let product = { ...req.body, image };
    if (req.file) {
        fs.unlinkSync(image);
        product = { ...req.body, image: req.file.path };
    }
    await productModel.findByIdAndUpdate(req.body._id, product);

    console.log("Product is Updated..");
    
    res.redirect('/products');
}

const DeleteProduct = async (req, res) => {
    const { image } = await productModel.findById(req.params._id);
    fs.unlinkSync(image);
    await productModel.findByIdAndDelete(req.params._id);

    console.log("Product is Deleted..");
    res.redirect('/products');
}

module.exports = { ViewProduct, AddProduct, SaveProduct, EditProduct, UpdateProduct, DeleteProduct }; 