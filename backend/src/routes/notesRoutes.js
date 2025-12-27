import express from "express"; 

import {
  getAllNotes, 
  deleteNote, 
  updateNote, 
  createNote, 
  getNoteById, 
} from "../controllers/notesController.js"; 

const router = express.Router();

router.get("/", getAllNotes); 
router.get("/:id", getNoteById); 
router.post("/", createNote); 
router.put("/:id", updateNote); 
router.delete("/:id", deleteNote); 

export default router; 