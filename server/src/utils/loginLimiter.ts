import rateLimit from "express-rate-limit";

// limit login attempts to 5 per 15 minutes per IP
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false, // disable the `X-RateLimit-*` headers
});
