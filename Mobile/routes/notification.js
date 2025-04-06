const notificationService = require('../services/notification');
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


//  CREATE NOTIFICATION

router.post('/create-notification', async (req, res) => {
    const response = await notificationService.createNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE NOTIFICATION

router.post('/update-notification', async (req, res) => {
    const response = await notificationService.updateNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE NOTIFICATION

router.post('/delete-notification', async (req, res) => {
    const response = await notificationService.deleteNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET NOTIFICATION

router.post('/get-notification', async (req, res) => {
    const response = await notificationService.getNotificationById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL NOTIFICATION

router.post('/get-all-notification', async (req, res) => {
    const response = await notificationService.getAllNotification(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH  NOTIFICATION DETAILS

router.post('/search-notification', async (req, res) => {
    const response = await notificationService.searchNotificationDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT NOTIFICATION

router.post('/count-notification', async (req, res) => {
    const response = await notificationService.countNotification(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;