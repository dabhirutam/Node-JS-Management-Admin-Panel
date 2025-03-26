const AddActiveLog = require("../middleware/AddActiveLog");
const activeLogModel = require("../models/activeLogModal");
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
    const { name, price, description, category, stockQuantity, userID } = req.body;

    const product = new productModel({
        userID,
        name,
        price,
        description,
        category,
        stockQuantity,
        image: req.file.path
    });

    await product.save();

    console.log("Product is created..");
    AddActiveLog("Product is Created..", product._id);

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

    AddActiveLog("Product is Updated..", req.body._id);
    
    res.redirect('/products');
}

const DeleteProduct = async (req, res) => {
    const { image } = await productModel.findById(req.params._id);
    fs.unlinkSync(image);

    AddActiveLog("Product is Deleted..", req.params._id);

    await productModel.findByIdAndDelete(req.params._id);

    console.log("Product is Deleted..");
    res.redirect('/products');
}

const ActiveLogList = async (req, res) => {
    const activeLogs = await activeLogModel.find();
    

    res.render('productComponents/activeLogList', {activeLogs});
}

module.exports = { ViewProduct, AddProduct, SaveProduct, EditProduct, UpdateProduct, DeleteProduct, ActiveLogList }; 