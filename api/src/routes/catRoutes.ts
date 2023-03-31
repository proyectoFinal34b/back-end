import { Router } from 'express';
import { delCat, getCatById, getCatByName, postCat,  updateCat } from '../controllers/catControllers';

const router: Router= Router()

router.get("/", getCatByName)
router.get("/:id", getCatById)
router.post("/", postCat)
router.put("/:id", updateCat)
router.delete("/:id", delCat)



export default router;