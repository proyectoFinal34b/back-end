import { Router } from 'express';
import { 
  getOrder, 
  postOrder
} from '../controllers/orderControllers';

const router: Router= Router()

router.get("/", getOrder)
router.post("/", postOrder)

export default router;