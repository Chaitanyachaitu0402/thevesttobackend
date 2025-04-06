const refundService = require('../services/refund');
const route = require('express');
const router = route.Router();




// CREATE BANNER

router.post('/create-Refund', async (req, res) => {
    const response = await refundService.createRefund(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BANNER

router.post('/update-Refund', async (req, res) => {
    const response = await refundService.updateRefund(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BANNER

router.post('/delete-Refund', async (req, res) => {
    const response = await refundService.deleteRefund(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// GET BANNER BY ID

router.post('/get-Refund-by-id', async (req, res) => {
    const response = await refundService.getRefundById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// Get all banners

router.post('/get-all-Refund', async (req, res) => {
    const response = await refundService.getallRefund(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// // GET BANNER BY NAME

// router.post('/search-Refund', async (req, res) => {
//     const response = await refundService.searchRefund(req);
//     if (response.success) {
//         res.json(response)
//     } else {
//         res.status(500).json(response);
//     }
// })

module.exports = router;