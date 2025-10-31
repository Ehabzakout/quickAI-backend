import { Router } from "express";
import AiService from "./ai.service";
import { uploadFile } from "../../util/multer";
import aiService from "./ai.service";

const router = Router();

router.post("/generate-article", AiService.generateArticle);
router.post("/generate-title", AiService.generateTitle);
router.post("/generate-image", AiService.generateImage);
router.post(
	"/remove-background",
	uploadFile.single("image"),
	aiService.removeBackground
);
router.post(
	"/remove-object",
	uploadFile.single("image"),
	aiService.removeObject
);
router.post(
	"/review-resume",
	uploadFile.single("resume"),
	aiService.removeObject
);
export default router;
