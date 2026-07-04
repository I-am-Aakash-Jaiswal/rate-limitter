import { Router } from "express";
import RateLimiter from "../../middlewares/rateLimmiter.js";

const router = Router();

const limitter = new RateLimiter();

router.use(limitter.rateLimit.bind(limitter))

router.get("/get", (req,res)=>{
    res.send("Yo user")
});

export default router;