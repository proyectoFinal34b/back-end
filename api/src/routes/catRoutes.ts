import { Router } from 'express';
import { delCat, getCatById, getCatByName, postCat, putCat } from '../controllers/catControllers';

const router: Router= Router()

router.get("/", getCatByName)
router.get("/:id", getCatById)
router.post("/", postCat)
router.put("/", putCat)
router.delete("/", delCat)



export default router;