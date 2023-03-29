import {Router} from 'express';
import userRoutes from './userRoutes';
import catRoutes from "./catRoutes"

const router = Router();

router.use('/user', userRoutes);
router.use('/cat', catRoutes);

export default router;