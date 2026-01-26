import express from "express"; 
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"; 
import dotenv from "dotenv"; 
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"; 

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;  

//Middleware to access data packet. 
app.use(cors({
  origin: ["http://localhost:5173"], 
})); 
app.use(express.json()); 
app.use(rateLimiter); 

app.use('/api/notes', notesRoutes); 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`This server is running on PORT: ${PORT}`)
  })
}).catch(() => {
  console.log("Could not connect to DB"); 
})

