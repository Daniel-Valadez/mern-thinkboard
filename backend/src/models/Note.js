import mongoose from "mongoose";

//1 - Create schema 
//2 - Create model based off of that schema. 

const noteSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: true, 
  }, 
  content: {
    type: String, 
    required: true, 
  }, 
  
}, {timestamps: true}) //createdAt, updatedAt fields when setting timestamps to true; 

//Create a note model based off the schema above. 
const Note = mongoose.model("Note", noteSchema); 

export default Note; 