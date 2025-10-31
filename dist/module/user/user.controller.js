"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const router = (0, express_1.Router)();
router.get("/creations", user_service_1.default.getAllCreations);
// router.get("/creations-likes");
router.patch("/toggle-like/:id", user_service_1.default.toggleLike);
router.get("/published", user_service_1.default.getPublishedCreations);
exports.default = router;
