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
router.post("/:id/ratings", postRating) //Esta ruta también crea el rating
router.put("/:id/admin/:idAdmin", updateProduct)
router.delete("/:id", delProduct)

export default router;