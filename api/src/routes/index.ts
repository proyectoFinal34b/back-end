import {Router} from 'express';
import userRoutes from './userRoutes';
import catRoutes from "./catRoutes"
import productRoutes from "./productRoutes"
import categoryRoutes from "./categoryRoutes"
import orderRoutes from "./orderRoutes"
import entriesRoutes from "./entriesRoutes"
import postDbFict from "./postDbFic"
import paymentRouter from "./paymentRoute"
import donateRoutes from "./donateRoutes"



const router = Router();

router.use("/donate",donateRoutes)

router.use('/user', userRoutes);
router.use('/cat', catRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/entries', entriesRoutes)
router.use("/db",postDbFict)
router.use("/payment", paymentRouter);

export default router;