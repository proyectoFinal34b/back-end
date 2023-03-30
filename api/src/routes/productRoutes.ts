import { Router } from 'express';
import { 
  getProduct, 
  postProduct
} from '../controllers/productControllers';

const router: Router= Router()

router.get("/", getProduct)
router.post("/", postProduct)

export default router;