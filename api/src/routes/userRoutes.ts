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
<<<<<<< HEAD
router.get("/validate", validateUser) // \"User\" has multiple relations with \"Cat\
router.get("/:id", getUserById)// \"User\" has multiple relations with \"Cat\
=======
router.get("/:id", getUserById)

router.post("/forgot", forgotPassword)
router.post("/validate", validateUser)
>>>>>>> 544088084645c76218f2205b704d66fce8cf35eb
router.post("/", postUser)

router.put("/:id", updateUser)
router.put("/:id/admin/:idAdmin", activeAdmin)
router.put("/:id/cat/:idCat/admin/:idAdmin",  sponsorCat  )
router.put("/:id/order/:idOrder", orderUser)
<<<<<<< HEAD
router.delete("/:id", delUser) //el delete crasheo
=======

router.delete("/:id", delUser)
>>>>>>> 544088084645c76218f2205b704d66fce8cf35eb

export default router;    
