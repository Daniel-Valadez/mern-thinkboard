import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    //If authentication is implemented, this would be where we would have their unique identifier. 
    //Everyone would be limited by "my-limit-key" in this implementation. 
    const {success} = await rateLimit.limit("my-limit-key"); 
    if(!success) {
      res.status(429).json({message: "Too many requests. Try again later"}); 
    } else {
      next(); 
    }
  } catch(error) {
    console.log("Rate limiting error"); 
    next(error); 
  }
}

export default rateLimiter; 