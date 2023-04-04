import { Router } from 'express';
import { 
  postUser,
  delUser,
  getUserByName,
  getUserById,
  updateUser,
  activeAdmin,
} from '../controllers/userControllers';

const router: Router= Router()

router.get("/", getUserByName)
router.get("/:id", getUserById)
router.post("/", postUser)
router.put("/:id", updateUser)
router.put("/user/:id/admin/:idAdmin", activeAdmin)
router.put("/user/:id/cat/:idCat/admin/:idAdmin", )
router.put("/order/:id/admin/:idAdmin")
router.delete("/:id", delUser)

export default router;