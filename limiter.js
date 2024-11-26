import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again after a minute.",
  },
});

export default limiter;