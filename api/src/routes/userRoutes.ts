import { Router } from 'express';
import { 
  postUser,
  delUser,
  getUserByName,
  getUserById,
  updateUser,
  activeAdmin
} from '../controllers/userControllers';

const router: Router= Router()

router.get("/", getUserByName)
router.get("/:id", getUserById)
router.post("/", postUser)
router.put("/:id", updateUser)
router.put("/:id/admin/:idAdmin", activeAdmin)
router.delete("/:id", delUser)

export default router;