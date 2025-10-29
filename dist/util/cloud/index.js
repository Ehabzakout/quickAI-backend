"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = exports.connectCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const envConfig_1 = require("../../config/envConfig");
const connectCloudinary = async () => {
    cloudinary_1.v2.config({
        cloud_name: envConfig_1.envConfig.cloud_name,
        api_key: envConfig_1.envConfig.cloudinary_api_key,
        api_secret: envConfig_1.envConfig.cloudinary_secret,
    });
};
exports.connectCloudinary = connectCloudinary;
const uploadPhoto = async (file, path, options) => {
    const { public_id, secure_url } = await cloudinary_1.v2.uploader.upload(file, {
        folder: `quickAI/images/${path}`,
        ...options,
    });
    return { public_id, secure_url };
};
exports.uploadPhoto = uploadPhoto;
