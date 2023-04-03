import { Router } from 'express';
import { 
  getOrder, 
  postOrder,
  delOrder,
  updateOrder,
} from '../controllers/orderControllers';

const router: Router= Router()


router.get("/", getOrder)
router.post("/", postOrder)
router.put("/:id", updateOrder)
router.delete("/:id", delOrder)

export default router;
