import { Router } from 'express';
import { 
  getProductByName, 
  getProductById,
  postProduct,
  postRating,
  delProduct,
  updateProduct
} from '../controllers/productControllers';

const router: Router= Router()

router.get("/", getProductByName)
router.get("/:id", getProductById)
router.post("/", postProduct)
router.post("/:id/ratings", postRating)
router.put("/:id", updateProduct)
router.delete("/:id", delProduct)

export default router;