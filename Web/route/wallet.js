const walletService = require('../services/wallet');
const route = require('express');
const router = route.Router();

// CREATE WALLET

router.post('/create-wallet', async (req, res) => {
    const response = await walletService.createWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE WALLET

router.post('/update-wallet-by-username', async (req, res) => {
    const response = await walletService.updateWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.post('/update-wallet', async (req, res) => {
    const response = await walletService.updateWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE WALLET

router.post('/delete-wallet-by-username', async (req, res) => {
    const response = await walletService.deleteWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET WALLET

router.post('/get-wallet-by-email', async (req, res) => {
    const response = await walletService.getWalletById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


router.post('/get-wallet-by-username', async (req, res) => {
    const response = await walletService.getWalletByUserName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL WALLET 

router.post('/get-all-wallet', async (req, res) => {
    const response = await walletService.getAllWallet(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH WALLET

router.post("/search-wallet", async (req, res) => {
    let response = await walletService.searchWalletDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;