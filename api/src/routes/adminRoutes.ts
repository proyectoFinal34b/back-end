import { Router } from 'express';
import { getCred, postCred } from '../controllers/adminControllers';

const router: Router = Router()

router.get("/", getCred)
router.post("/", postCred)

export default router;