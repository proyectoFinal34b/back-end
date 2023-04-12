import {Router} from 'express';
import userRoutes from './userRoutes';
import catRoutes from "./catRoutes"
import productRoutes from "./productRoutes"
import categoryRoutes from "./categoryRoutes"
import orderRoutes from "./orderRoutes"
import entriesRoutes from "./entriesRoutes"
import postDbFict from "./postDbFic"
const router = Router();

router.use('/user', userRoutes);
router.use('/cat', catRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/entries', entriesRoutes)
router.use("/db",postDbFict)

export default router;