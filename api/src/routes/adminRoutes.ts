import { Router } from 'express';
import {  postUserAdmin, getAdmin } from '../controllers/adminControllers';

const router: Router= Router()

router.post("/",postUserAdmin)
router.get("/",(getAdmin))
export default router;