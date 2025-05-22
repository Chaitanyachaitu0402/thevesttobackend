const express = require('express');
const multer = require('multer');
const { createProduct, updateProduct1,updateProduct2,updateProduct3,updateProduct4,updateProduct5, deleteProduct, deleteProductByName, getProductById,
     getAllProduct, searchProductDetails, bulkProductUpload,updateProductImage,getProductByCategoryId, getProductByName } = require('../services/product');
const router = express.Router();
const path = require('path')

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "/tmp")
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + path.extname(file.originalname));
            }
        }
    )
var upload = multer(
    {
        storage: imageconfig,
        limits: {
            fileSize: 1000000000
        }
    }
);

router.post('/create-product', upload.single('Product_image'), async (req, res) => {
    const response = await createProduct(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-product1', upload.single('Product_image1'), async (req, res) => {
    const response = await updateProduct1(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-product2', upload.single('Product_image2'), async (req, res) => {
    const response = await updateProduct2(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-product3', upload.single('Product_image3'), async (req, res) => {
    const response = await updateProduct3(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-product4', upload.single('Product_image4'), async (req, res) => {
    const response = await updateProduct4(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-product5', upload.single('Product_image5'), async (req, res) => {
    const response = await updateProduct5(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/update-product-image', upload.single("Product_image"), async (req, res) => {
    const response = await updateProductImage(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.delete('/delete-product', async (req, res) => {
    const response = await deleteProduct(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/delete-product-by-name', async (req, res) => {
    const response = await deleteProductByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-product-by-id', async (req, res) => {
    const response = await getProductById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-product-by-name', async (req, res) => {
    const response = await getProductByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-product-by-category-id', async (req, res) => {
    const response = await getProductByCategoryId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.get('/get-all-product', async (req, res) => {
    const response = await getAllProduct(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/search-product', async (req, res) => {
    const response = await searchProductDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/bulkUpload', upload.single('csv_file'), async (req, res) => {
    const response = await bulkProductUpload(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;
