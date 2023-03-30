import { Router } from 'express';
import { 
  getCategory, 
  postCategory
} from '../controllers/categoryControllers';

const router: Router= Router()

router.get("/", getCategory)
router.post("/", postCategory)

export default router;