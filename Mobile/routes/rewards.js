const rewardsService = require('../services/rewards');
const route = require('express');
const router = route.Router();


// CREATE BRAND

router.post('/create-rewards',  async (req, res) => {
    const response = await rewardsService.createRewards(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BRAND

router.post('/update-rewards', async (req, res) => {
    const response = await rewardsService.updateRewards(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BRAND BY ID

router.post('/delete-rewards-by-id', async (req, res) => {
    const response = await rewardsService.deleteRewards(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET BRAND

router.post('/get-rewards-by-id', async (req, res) => {
    const response = await rewardsService.getRewardsById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BRAND 

router.post('/get-all-rewards', async (req, res) => {
    const response = await rewardsService.getAllRewards(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH BRAND

router.post("/search-rewards", async (req, res) => {
    let response = await rewardsService.searchRewardsDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;