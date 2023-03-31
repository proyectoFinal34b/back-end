import { Router } from 'express';
import { 
  getProduct, 
  postProduct,
  postRating
} from '../controllers/productControllers';

const router: Router= Router()

router.get("/", getProduct)
router.post("/", postProduct)
router.post("/:id/ratings", postRating )

export default router;