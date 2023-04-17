import { Router } from 'express';
import { 
} from '../controllers/userControllers';
import { stripPayment } from '../controllers/stripPaymentController';

const router: Router= Router()


router.post("/checkout",stripPayment)
export default router;    