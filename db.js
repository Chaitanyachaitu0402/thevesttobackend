require('mysql2');


const { Sequelize, Model } = require('sequelize')
const usermodel = require('./model/user')
const categoriesModel = require('./model/categories')
const subcategoriesModel = require('./model/sub_categories')
const cartModel = require('./model/cart')
const ordersModel = require('./model/orders')
const walletModel = require('./model/wallet')
const contactModel = require('./model/contact')
const productModel = require('./model/product')
const cardModel = require('./model/card')
const pincodeModel = require('./model/pincode')
const wishlistModel = require('./model/wishlist')
const bannerModel = require('./model/banners')
const subheadingModel = require('./model/subheadings')
const offersModel = require('./model/offers')
const bestsellerModel = require('./model/bestsellers')
const brandModel = require('./model/brand')
const couponModel = require('./model/coupons')
const rewardsModel = require('./model/rewards')
const orderagainModel = require('./model/orderagain')
const tcModel = require('./model/t & c ')
const refundModel = require('./model/refund')
const shippingModel = require('./model/shipping')
const addressModel = require('./model/address')
const sub_categories_1Model = require('./model/sub_categories_1')
const sub_categories_2Model = require('./model/sub_categories_2')
const sub_categories_3Model = require('./model/sub_categories_3')














const sequelize = new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    }
)

const user = usermodel(sequelize)
const categories = categoriesModel(sequelize)
const subcategories = subcategoriesModel(sequelize)
const cart = cartModel(sequelize)
const orders = ordersModel(sequelize)
const wallet = walletModel(sequelize)
const contact = contactModel(sequelize)
const product = productModel(sequelize)
const card = cardModel(sequelize)
const pincode = pincodeModel(sequelize)
const wishlist = wishlistModel(sequelize)
const banner = bannerModel(sequelize)
const subheading = subheadingModel(sequelize)
const offers = offersModel(sequelize)
const bestseller = bestsellerModel(sequelize)
const brand = brandModel(sequelize)
const coupon = couponModel(sequelize)
const rewards = rewardsModel(sequelize)
const orderagain = orderagainModel(sequelize)
const tc = tcModel(sequelize)
const refund = refundModel(sequelize)
const shipping = shippingModel(sequelize)
const address= addressModel(sequelize)
const sub_categories_1 = sub_categories_1Model(sequelize)
const sub_categories_2 = sub_categories_2Model(sequelize)
const sub_categories_3 = sub_categories_3Model(sequelize)









const createtable = () => {
    try {
        sequelize.authenticate();

        user.sync({ alter: false })
        categories.sync({ alter: false })
        subcategories.sync({ alter: false })
        cart.sync({ alter: false })
        orders.sync({ alter: false })
        wallet.sync({ alter: false })
        contact.sync({ alter: false })
        product.sync({ alter: false })
        card.sync({ alter: false })
        pincode.sync({ alter: false })
        wishlist.sync({ alter: false })
        banner.sync({ alter: false })
        subheading.sync({ alter: false })
        offers.sync({ alter: false })
        bestseller.sync({ alter: false })
        brand.sync({ alter: false })
        coupon.sync({ alter: false })
        rewards.sync({ alter: false })
        orderagain.sync({ alter: false })
        tc.sync({ alter: false })
        refund.sync({ alter: false })
        shipping.sync({ alter: false })
        address.sync({ alter: false })
        sub_categories_1.sync({ alter: false })
        sub_categories_2.sync({ alter: false })
        sub_categories_3.sync({ alter: false })


        console.log("table created")

    }
    catch (error) {
        console.log("error" + error)
    }
}

module.exports = { sequelize, createtable }