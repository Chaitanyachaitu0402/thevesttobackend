const orderagainService = require('../services/orderagain');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storege/userdp")
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

// CREATE BRAND

router.post('/create-orderagain', upload.single("product_image"), async (req, res) => {
    const response = await orderagainService.createOrderAgain(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BRAND

router.post('/update-orderagain', upload.single("product_image"), async (req, res) => {
    const response = await orderagainService.updateOrderAgain(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BRAND BY ID

router.post('/delete-orderagain-by-id', async (req, res) => {
    const response = await orderagainService.deleteOrderAgain(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET BRAND

router.post('/get-orderagain-by-id', async (req, res) => {
    const response = await orderagainService.getOrderAgainById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BRAND 

router.post('/get-all-orderagain', async (req, res) => {
    const response = await orderagainService.getAllOrderAgain(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH BRAND

router.post("/search-orderagain", async (req, res) => {
    let response = await orderagainService.searchOrderAgainDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;