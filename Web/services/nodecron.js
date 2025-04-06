const cron = require('node-cron');
const { getAllCoupon } = require('../services/coupons'); // Adjust the path as necessary

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily coupon cleanup');
    try {
        await deleteExpiredCoupons();
    } catch (error) {
        console.error('Error during coupon cleanup:', error);
    }
});
