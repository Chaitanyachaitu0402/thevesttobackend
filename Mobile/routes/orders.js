const { json } = require('body-parser');
const orderService = require('../services/orders');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/userdp")
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


//  CREATE ORDERS

router.post('/create_order',upload.single("product_image"), async (req, res) => {
    const response = await orderService.createOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// UPDATE ORDERS

router.post('/update_order',upload.single("product_image"),async (req, res) => {
    const response = await orderService.updateOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE ORDERS

router.post('/delete_order', async (req, res) => {
    const response = await orderService.deleteOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ORDERS

router.post('/get_orderid', async (req, res) => {
    const response = await orderService.getOrderId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


router.post('/get_order', async (req, res) => {
    const response = await orderService.getOrderById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});




router.post('/get_order_byproductId', async (req, res) => {
    const response = await orderService.getOrderByProductId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});
// GET ALL ORDERS

router.post('/getall_order', async (req, res) => {
    const response = await orderService.getAllOrder(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// SEARCH  ORDERS DETAILS

router.post('/search_order', async (req, res) => {
    const response = await orderService.searchOrderDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT ORDERS

router.post('/count_orders', async (req, res) => {
    const response = await orderService.countOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});





module.exports = router;