import { Router } from 'express';
import { 
  postUser,
  delUser,
  getUserByName,
  getUserById,
  updateUser,
  activeAdmin,
  sponsorCat,
  validateUser,
  orderUser,
} from '../controllers/userControllers';
import { forgotPassword } from '../controllers/forgotPassword';


const router: Router= Router()

router.get("/", getUserByName) 
router.get("/:id", getUserById)

router.post("/forgot", forgotPassword)
router.post("/validate", validateUser)
router.post("/", postUser)

router.put("/:id", updateUser)
router.put("/:id/admin/:idAdmin", activeAdmin)
router.put("/:id/cat/:idCat/admin/:idAdmin", sponsorCat )
router.put("/:id/order/:idOrder", orderUser)

router.delete("/:id", delUser)

export default router;    