const productService = require('../services/products');
const route = require('express');
const router = route.Router();
const multer = require('multer');
const path = require('path');
const fs = require('file-system');



// IMAGE CONFIGURATIONS

const imageconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./storege/userdp");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({
    storage: imageconfig,
    limits: {
        fileSize: 1000000000
    }
});

// CREATE PRODUCT

router.post('/create-product', upload.single("product_image"), async (req, res) => {
    const response = await productService.createProduct(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// UPDATE PRODUCT

router.post('/update-product', upload.single("product_image"), async (req, res) => {
    const response = await productService.updateProduct(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// DELETE PRODUCT BY ID

router.post('/delete-product-by-id', async (req, res) => {
    const response = await productService.deleteProduct(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// DELETE PRODUCT BY PRODUCT NAME

router.post('/delete-product-by-product-name', async (req, res) => {
    const response = await productService.deleteProductByName(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// GET PRODUCT

router.post('/get-product-by-id', async (req, res) => {
    const response = await productService.getProductById(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-product-by-Categoryid', async (req, res) => {
    const response = await productService.getProductByCategoryId(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// GET ALL PRODUCT 

router.post('/get-all-product', async (req, res) => {
    const response = await productService.getAllProduct(req);
    if (response) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// SEARCH PRODUCT

router.post("/search-product", async (req, res) => {
    let response = await productService.searchProductDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

// BULK UPLOAD PRODUCTS FROM CSV

router.post('/bulk-upload-products', upload.single("csv_file"), async (req, res) => {
    try {
        const response = await productService.bulkUploadProducts(req);
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
