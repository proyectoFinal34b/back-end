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

router.get("/", getProductByName) // que traiga los items independientemente del nombre
router.get("/:id", getProductById)
router.post("/", postProduct)
router.post("/:id/ratings", postRating) // no funciona
router.put("/:id", updateProduct)
router.delete("/:id", delProduct)

export default router;