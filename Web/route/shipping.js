const shippingServices = require('../services/shipping');
const route = require('express');
const router = route.Router();




// CREATE BANNER

router.post('/create-Shipping', async (req, res) => {
    const response = await shippingServices.createShipping(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BANNER

router.post('/update-Shipping', async (req, res) => {
    const response = await shippingServices.updateShipping(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BANNER

router.post('/delete-Shipping', async (req, res) => {
    const response = await shippingServices.deleteShipping(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// GET BANNER BY ID

router.post('/get-Shipping-by-id', async (req, res) => {
    const response = await shippingServices.getShippingById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// Get all banners

router.post('/get-all-Shipping', async (req, res) => {
    const response = await shippingServices.getallShipping(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});



module.exports = router;