import { Router } from "express";

import userRoutes from "./user/user.route.js";
import landingRoutes from "./landing/landing.route.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/landing", landingRoutes);

export default router;