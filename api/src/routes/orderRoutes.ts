import { Router } from 'express';
import { 
  getOrder, 
  postOrder,
  delOrder,
  updateOrder,
  getOrderById,
} from '../controllers/orderControllers';

const router: Router= Router()


router.get("/", getOrder)
router.get("/:id", getOrderById)
router.post("/", postOrder)
router.put("/:id/admin/:idAdmin", updateOrder)
router.delete("/:id", delOrder)

export default router;
