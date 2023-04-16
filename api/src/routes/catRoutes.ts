import { Router } from 'express';
import { delCat, getCatById, getCatByName, postCat,  updateCat } from '../controllers/catControllers';

const router: Router= Router()


router.get("/", getCatByName)
router.get("/:id", getCatById)
router.post("/:id", postCat)
router.put("/:id/admin/:idAdmin", updateCat) 
router.delete("/:id", delCat)



export default router;