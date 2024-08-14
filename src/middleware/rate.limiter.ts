import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50,
  message: "Too many requests from this IP, please try again after 5 minutes",
});
