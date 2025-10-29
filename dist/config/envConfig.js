"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.envConfig = {
    database_Url: process.env.DATABASE_URL,
    port: process.env.PORT,
    clerk_publish_key: process.env.CLERK_PUBLISHABLE_KEY,
    clerk_secret: process.env.CLERK_SECRET_KEY,
    ai_api_key: process.env.AI_API_KEY,
    clip_drop_key: process.env.CLIP_DROP_KEY,
    clip_drop_api: process.env.CLIP_DROP_API,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUD_NAME,
};
