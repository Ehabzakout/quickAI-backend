import { Router } from "express";
import userService from "./user.service";

const router = Router();

router.get("/creations", userService.getAllCreations);
// router.get("/creations-likes");
router.patch("/toggle-like/:id", userService.toggleLike);
router.get("/published", userService.getPublishedCreations);
export default router;
