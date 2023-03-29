import { Router } from 'express';
import { 
  getUser, 
  postUser
} from '../controllers/userControllers';

const router: Router= Router()

router.get("/", getUser)
router.post("/", postUser)

export default router;