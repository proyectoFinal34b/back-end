import { Router } from 'express';
import { 
  getCategoryByName, 
  getCategoryById,
  postCategory,
  delCategory,
  updateCategory
} from '../controllers/categoryControllers';

const router: Router= Router()

router.get("/", getCategoryByName)
router.get("/:id", getCategoryById)
router.post("/", postCategory)
router.put("/:id", updateCategory)
router.delete("/:id", delCategory)

export default router;