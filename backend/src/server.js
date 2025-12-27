import express from "express"; 
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"; 
import dotenv from "dotenv"; 

dotenv.config(); 

connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;  

app.use('/api/notes', notesRoutes); 

app.listen(PORT, () => {
  console.log(`This server is running on PORT: ${PORT}`)
})