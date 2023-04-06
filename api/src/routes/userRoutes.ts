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

const router: Router= Router()

router.get("/", getUserByName) 
router.get("/validate", validateUser) // \"User\" has multiple relations with \"Cat\
router.get("/:id", getUserById)// \"User\" has multiple relations with \"Cat\
router.post("/", postUser)
router.put("/:id", updateUser)
router.put("/:id/admin/:idAdmin", activeAdmin)
router.put("/:id/cat/:idCat/admin/:idAdmin",  sponsorCat  )
router.put("/:id/order/:idOrder", orderUser)
router.delete("/:id", delUser) //el delete crasheo

export default router;    
