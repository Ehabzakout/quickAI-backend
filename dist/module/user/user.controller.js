"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = __importDefault(require("./user.service"));
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.get("/creations", auth_middleware_1.default, user_service_1.default.getAllCreations);
router.patch("/toggle-like/:id", auth_middleware_1.default, user_service_1.default.toggleLike);
router.get("/published", auth_middleware_1.default, user_service_1.default.getPublishedCreations);
exports.default = router;
