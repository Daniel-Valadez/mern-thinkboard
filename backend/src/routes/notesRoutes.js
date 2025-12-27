import express from "express"; 

import {
  getAllNotes, 
  deleteNote, 
  updateNote, 
  createNote, 
} from "../controllers/notesController.js"; 

const router = express.Router();

router.get("/", getAllNotes); 
router.post("/", createNote); 
router.put("/:id", updateNote); 
router.delete("/:id", deleteNote); 

export default router; 