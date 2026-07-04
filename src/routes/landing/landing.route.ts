import { Router } from "express";

const router = Router();

router.get("/get", (req,res)=>{
    res.send("Hello user, this page do not have rate limitting")
});

export default router;