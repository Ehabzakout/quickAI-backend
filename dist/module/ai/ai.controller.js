"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_service_1 = __importDefault(require("./ai.service"));
const multer_1 = require("../../util/multer");
const ai_service_2 = __importDefault(require("./ai.service"));
const router = (0, express_1.Router)();
router.post("/generate-article", ai_service_1.default.generateArticle);
router.post("/generate-title", ai_service_1.default.generateTitle);
router.post("/generate-image", ai_service_1.default.generateImage);
router.post("/remove-background", multer_1.uploadFile.single("image"), ai_service_2.default.removeBackground);
router.post("/remove-object", multer_1.uploadFile.single("image"), ai_service_2.default.removeObject);
exports.default = router;
