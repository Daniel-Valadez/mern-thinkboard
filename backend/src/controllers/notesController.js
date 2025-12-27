import Note from "../models/Note.js"; 

export const getAllNotes = async (req, res) => {
  //res.status(200).send("You just fetched the notes"); 
  try {
    //Get every note. 
    const notes = await Note.find(); 

    res.status(200).json(notes); 

  } catch (error) {
    console.error("ERROR IN GET ALL NOTES CONTROLLER", error); 
    res.status(500).json({message: "Internal server error."}); 
  }
} 

export const createNote = async (req, res) => {
  try {
    const {title, content} = req.body;

    const newNote = new Note({title, content}); 

    const savedNote = await newNote.save(); 

    res.status(201).json(savedNote); 
  } catch (error) {
    console.error("Error in createNote controller", error); 
    res.status(500).json({message: "Internal server error"}); 
  }
}

export const updateNote = async (req, res) => {
  try {
    const {title, content} = req.body; 
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true}); 

    if(!updatedNote) {
      return res.status(404).json({message: "Note not found"}); 
    }
    
    res.status(200).json(updatedNote); 
  } catch (error) {
    console.error("Error in updateNote controller", error); 
    res.status(500).json({message: "Internal server error"}); 
  }
}

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id); 

    if(!deletedNote) {
      return res.status(404).json({message: "Note could not be found for deletion."}); 
    }

    res.status(200).json({message: "The note was successfully deleted"}); 
  } catch (error) {
    console.error("Error in deleteNote controller", error); 
    res.status(500).json({message: "Internal server error"}); 
  }
}

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id); 

    if(!note) {
      return res.status(404).json({message: "Could not find note by ID"}); 
    }

    res.status(200).json(note); 

  } catch(error) {
    res.status(500).json({message: "Internal server error"}); 
  }
}