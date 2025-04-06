require('dotenv').config();
const express = require("express")
const { createtable } = require('./db')
const http = require('http')
const path = require('path')

// FOR WEB

const payment = require('./Web/route/payment')
const user_web = require('./Web/route/user')
const categories_web = require('./Web/route/categories')
const sub_categories_web = require('./Web/route/sub_categories')
const cart_web = require('./Web/route/cart')
const orders_web = require('./Web/route/orders')
const wallet_web = require('./Web/route/wallet')
const contact_web = require('./Web/route/contact')
const product_web = require('./Web/route/product')
const card_web = require('./Web/route/card')
const pincode_web = require('./Web/route/pincode')
const banner_web = require('./Web/route/banners')
const subheading_web = require('./Web/route/subheadings')
const offers_web = require('./Web/route/offers')
const bestseller_web = require('./Web/route/bestsellers')
const brand_web = require('./Web/route/brand')
const coupon_web = require('./Web/route/coupons')
const rewards_web = require('./Web/route/rewards')
const tc_web = require('./Web/route/t & c ')
const refund_web = require('./Web/route/refund')
const sub_categories_1_web = require('./Web/route/sub_categories_1')
const sub_categories_2_web = require('./Web/route/sub_categories_2')
const sub_categories_3_web = require('./Web/route/sub_categories_3')







// FOR MOBILE APP

const user_mob = require('./Mobile/routes/user')
const categories_mob = require('./Mobile/routes/categories')
const sub_categories_mob = require('./Mobile/routes/sub_categories')
const orders_mob = require('./Mobile/routes/orders')
const notification_mob = require('./Mobile/routes/notification')
const address_mob = require('./Mobile/routes/address')
const wallet_mob = require('./Mobile/routes/wallet')
const cart_mob = require('./Mobile/routes/cart')
const contact_mob = require('./Mobile/routes/contact');
const products_mob = require('./Mobile/routes/products')
const card_mob = require('./Mobile/routes/card')
const wishlist_mob = require('./Mobile/routes/wishlist')
const banner_mob = require('./Mobile/routes/banners')
const bestseller_mob = require('./Mobile/routes/bestsellers')
const brand_mob = require('./Mobile/routes/brand')
const coupon_mob = require('./Mobile/routes/coupons')
const offers_mob = require('./Mobile/routes/offers')
const orderagain_mob = require('./Mobile/routes/orderagain')
const rewards_mob = require('./Mobile/routes/rewards')
const subheading_mob = require('./Mobile/routes/subheadings')
const topcategory_mob=require('./Mobile/routes/topcategory')


var cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')
const { create } = require('domain');

const createtable1 = () => {
    try {
        createtable();
    }
    catch (error) {
        console.log("error", error)
    }
}
createtable1()

const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({ limit: '100mb', extended: 'true' }))
app.use(bodyparser.json({ limit: '100mb' }))
app.use('/storege', express.static(path.join(__dirname, 'storege')));


app.use('/web/user', user_web)
app.use('/web/categories', categories_web)
app.use('/web/sub-categories', sub_categories_web)
app.use('/web/cart', cart_web)
app.use('/web/order', orders_web)
app.use('/web/wallet', wallet_web)
app.use('/web/contact', contact_web)
app.use('/web/product', product_web)
app.use('/web/card', card_web)
app.use('/web/pincode', pincode_web)
app.use('/web/banner', banner_web)
app.use('/web/subheading', subheading_web)
app.use('/web/offers', offers_web)
app.use('/web/bestseller', bestseller_web)
app.use('/web/brand', brand_web)
app.use('/web/coupon', coupon_web)
app.use('/web/rewards', rewards_web)
app.use('/web/payment',payment)
app.use('/web/tc',tc_web)
app.use('/web/refund',refund_web)
app.use('/web/sub-category-1',sub_categories_1_web)
app.use('/web/sub-category-2',sub_categories_2_web)
app.use('/web/sub-category-3',sub_categories_3_web)






// FOR MOB

app.use('/mob/user', user_mob)
app.use('/mob/contact', contact_mob)
app.use('/mob/orders', orders_mob)
app.use('/mob/notification', notification_mob)
app.use('/mob/address', address_mob)
app.use('/mob/wallet', wallet_mob)
app.use('/mob/cart', cart_mob)
app.use('/mob/categories', categories_mob)
app.use('/mob/sub-categories', sub_categories_mob)
app.use('/mob/products', products_mob)
app.use('/mob/card', card_mob)
app.use('/mob/wishlist', wishlist_mob)
app.use('/mob/banner', banner_mob)
app.use('/mob/bestsellar', bestseller_mob)
app.use('/mob/brand', brand_mob)
app.use('/mob/coupon', coupon_mob)
app.use('/mob/offers', offers_mob)
app.use('/mob/orderagain', orderagain_mob)
app.use('/mob/rewards', rewards_mob)
app.use('/mob/subheading', subheading_mob)
app.use('/mob/topcategory',topcategory_mob)


const port = 3001 || process.env.appport
const sarver = http.createServer(app)
sarver.listen(port, () => {
    console.log("servar is running at port", +port)

});