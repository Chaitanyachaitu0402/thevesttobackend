const { json } = require('body-parser');
const walletService = require('../services/wallet');
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

//  CREATE WALLET

router.post('/create-wallet', async (req, res) => {
    const response = await walletService.createWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE WALLET

router.post('/update-wallet', async (req, res) => {
    const response = await walletService.updateWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE WALLET

router.post('/delete-wallet', async (req, res) => {
    const response = await walletService.deleteWallet(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET WALLET

router.post('/get-wallet', async (req, res) => {
    const response = await walletService.getWalletById(req);
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

// SEARCH WALLET DETAILS

router.post('/search-wallet', async (req, res) => {
    const response = await walletService.searchWalletDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;