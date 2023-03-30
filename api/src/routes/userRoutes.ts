import { Router } from 'express';
import { 
  postUser,
  delUser,
  getUserByName,
  getUserById,
  putUser
} from '../controllers/userControllers';

const router: Router= Router()

router.get("/", getUserByName)
router.get("/:id", getUserById)
router.post("/", postUser)
router.put("/", putUser)
router.delete("/", delUser)

export default router;