import { Router } from "express";

const router = Router();

router.get("/get", (req,res)=>{
    res.send("Yo landing")
});

export default router;