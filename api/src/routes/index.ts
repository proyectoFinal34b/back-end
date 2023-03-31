import {Router} from 'express';
import userRoutes from './userRoutes';
import catRoutes from "./catRoutes"
import productRoutes from "./productRoutes"
import categoryRoutes from "./categoryRoutes"
import orderRoutes from "./orderRoutes"
import entriesRoutes from "./entriesRoutes"

const router = Router();

router.use('/user', userRoutes);
router.use('/cat', catRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/entries', entriesRoutes)


export default router;