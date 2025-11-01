import { Router } from "express";
import userService from "./user.service";
import isAuthenticated from "../../middleware/auth.middleware";

const router = Router();

router.get("/creations", isAuthenticated, userService.getAllCreations);

router.patch("/toggle-like/:id", isAuthenticated, userService.toggleLike);
router.get("/published", isAuthenticated, userService.getPublishedCreations);
export default router;
