const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require ('./user.js');
const orderRouter = require('./order.js');
const authRouter = require('./auth.js');
const reviewRouter = require('./review.js');
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/auth',authRouter);
router.use('/review',reviewRouter);


module.exports = router;
