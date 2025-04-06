const tcService = require('../services/t & c ');
const route = require('express');
const router = route.Router();




// CREATE BANNER

router.post('/create-tc', async (req, res) => {
    const response = await tcService.createTc(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BANNER

router.post('/update-tc', async (req, res) => {
    const response = await tcService.updateTc(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.post('/update-tc-by-id', async (req, res) => {
    const response = await tcService.updateTcById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BANNER

router.post('/delete-tc', async (req, res) => {
    const response = await tcService.deleteTc(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.post('/delete-tc-by-id', async (req, res) => {
    const response = await tcService.deleteTcById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// GET BANNER BY ID

router.post('/get-tc-by-id', async (req, res) => {
    const response = await tcService.getTcById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// Get all banners

router.post('/get-all-tc', async (req, res) => {
    const response = await tcService.getallTc(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET BANNER BY NAME

router.post('/search-tc', async (req, res) => {
    const response = await tcService.searchTc(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

module.exports = router;