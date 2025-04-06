const { json } = require('body-parser');
const addressService = require('../services/address');
const route = require('express');
const router = route.Router();
const path = require('path')



//  CREATE ADDRESS

router.post('/create-address', async (req, res) => {
    const response = await addressService.createAddress(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// UPDATE ADDRESS

router.post('/update-address', async (req, res) => {
    const response = await addressService.updateAddress(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE ADDRESS

router.post('/delete-address', async (req, res) => {
    const response = await addressService.deleteAddress(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ADDRESS

router.post('/get-address-by-address-id', async (req, res) => {
    const response = await addressService.getAddressById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ADDRESS

router.post('/get-address-by-user-id', async (req, res) => {
    const response = await addressService.getAddressByUserId(req);
    console.log("------------->",response)
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL ADDRESS

router.post('/get-all-address', async (req, res) => {
    const response = await addressService.getAllAddress(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// SEARCH ADDRESS DETAILS

router.post('/search-address', async (req, res) => {
    const response = await addressService.searchAddressDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;