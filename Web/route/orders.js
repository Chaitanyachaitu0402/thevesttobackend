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

// CREATE ORDERS

router.post('/create-order', upload.single("screenshot"), async (req, res) => {
    const response = await orderService.createOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE ORDERS

router.post('/update-order', upload.single("order_image"), async (req, res) => {
    const response = await orderService.updateOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.post('/update-order-by-username', upload.single("order_image"), async (req, res) => {
    const response = await orderService.updateOrderbyname(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE ORDERS BASED ON THE USER ID

router.post('/update-status-by-order_id', upload.single("order_image"), async (req, res) => {
    const response = await orderService.updateStatusByUserId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE ORDERS

router.post('/delete-order-by-id', async (req, res) => {
    const response = await orderService.deleteOrder(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ORDERS

router.post('/get-order-by-id', async (req, res) => {
    const response = await orderService.getOrderById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ORDERS BASED ON USER_ID

router.post('/get-order-by-user-id', async (req, res) => {
    const response = await orderService.getOrderByUserId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

router.post('/get-order-by-user-name', async (req, res) => {
    const response = await orderService.getOrderByUserName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET ALL ORDERS 

router.post('/get-all-order', async (req, res) => {
    const response = await orderService.getAllOrder(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT ORDERS

router.post('/count-all-orders', async (req, res) => {
    const response = await orderService.countAllOrder(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT ORDERS USER ID

router.post('/count-all-orders-by-user-id', async (req, res) => {
    const response = await orderService.countAllOrderByUserId(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH ORDERS

router.post("/search-order", async (req, res) => {
    let response = await orderService.searchOrderDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;