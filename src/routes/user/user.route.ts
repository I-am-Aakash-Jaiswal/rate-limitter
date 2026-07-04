import { Router } from "express";
import RateLimiter from "../../middlewares/rateLimmiter.js";

const router = Router();

const limitter = new RateLimiter();

router.use(limitter.rateLimit.bind(limitter))

router.get("/get", (req,res)=>{
    return res.send("Hello user this page have rate limitting")
});

export default router;