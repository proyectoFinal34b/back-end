import express from 'express';
import { createEntry, deleteEntry, getAllEntries, getEntryById, updateEntry } from '../controllers/entriesControllers';


const   router = express.Router();

router.get("/", getAllEntries);
router.get("/:id", getEntryById );
router.post("/admin/:idAdmin", createEntry);
router.put("/:id/admin/:idAdmin", updateEntry);
router.delete("/:id", deleteEntry);


export default router;
