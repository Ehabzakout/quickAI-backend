"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../util/error");
const ai_1 = require("../../util/ai");
const express_1 = require("@clerk/express");
const DB_1 = require("../../DB");
const axios_1 = __importDefault(require("axios"));
const envConfig_1 = require("../../config/envConfig");
const cloud_1 = require("../../util/cloud");
const cloudinary_1 = require("cloudinary");
class AiService {
    generateArticle = async (req, res) => {
        const { prompt, length } = req.body;
        const { userId } = (0, express_1.getAuth)(req);
        const plan = req.plan;
        const free_usage = req.free_usage;
        if (plan !== "premium" && free_usage >= 10)
            throw new error_1.AppError("You have all your limited requests upgrade your plan ", 403);
        const response = await ai_1.AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_completion_tokens: length,
        });
        const article = response.choices[0]?.message.content;
        await (0, DB_1.connect)() `INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${article},'article')`;
        if (plan !== "premium") {
            await express_1.clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                },
            });
        }
        return res.status(200).json({ message: "success", success: true, article });
    };
    // generate Title
    generateTitle = async (req, res) => {
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;
        const { userId } = (0, express_1.getAuth)(req);
        if (plan !== "premium" && free_usage >= 10)
            throw new error_1.AppError("You have all your limited requests upgrade your plan ", 403);
        const response = await ai_1.AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_completion_tokens: length,
        });
        const article = response.choices[0]?.message.content;
        await (0, DB_1.connect)() `INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${article},'blog title')`;
        if (plan !== "premium") {
            await express_1.clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                },
            });
        }
        return res.status(200).json({ message: "success", success: true, article });
    };
    generateImage = async (req, res) => {
        const { prompt, published } = req.body;
        const { userId } = (0, express_1.getAuth)(req);
        if (req.plan !== "premium")
            throw new error_1.AppError("This feature is available for premium plan", 403);
        const formData = new FormData();
        formData.append("prompt", prompt);
        const response = await axios_1.default.post(`${envConfig_1.envConfig.clip_drop_api}`, formData, {
            headers: { "x-api-key": envConfig_1.envConfig.clip_drop_key },
            responseType: "arraybuffer",
        });
        const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;
        const path = published ? `public` : `privet/${userId}/images`;
        const photoData = await (0, cloud_1.uploadPhoto)(base64Image, path);
        await (0, DB_1.connect)() `INSERT INTO creations (user_id,prompt,content,type,published) VALUES (${userId},${prompt},${JSON.stringify(photoData)},'image',${published ?? false})`;
        return res.json(201).json({
            message: "generated image success",
            success: true,
            content: photoData.secure_url,
            public: published,
        });
    };
    // Remove background
    removeBackground = async (req, res) => {
        const { userId } = (0, express_1.getAuth)(req);
        if (req.plan !== "premium")
            throw new error_1.AppError("you need to upgrade your plan", 403);
        if (!req.file)
            throw new error_1.AppError("No file uploaded", 400);
        const { secure_url, public_id } = await (0, cloud_1.uploadPhoto)(req.file.path, `privet/${userId}/remove-background`, {
            transformation: [
                {
                    effect: "background_removal",
                    background_removal: "remove_the_background",
                },
            ],
        });
        // Update database
        await (0, DB_1.connect)() `INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},'remove background image',${secure_url},'image')`;
        return res.status(200).json({
            message: "your background has removed successfully",
            success: true,
            image: secure_url,
        });
    };
    // Remove Object
    removeObject = async (req, res) => {
        const { userId } = (0, express_1.getAuth)(req);
        if (req.plan !== "premium")
            throw new error_1.AppError("you need to upgrade your plan", 403);
        if (!req.file)
            throw new error_1.AppError("No file uploaded", 400);
        const { object } = req.body;
        const { secure_url, public_id } = await (0, cloud_1.uploadPhoto)(req.file.path, `privet/${userId}/remove-object`);
        const imageUrl = cloudinary_1.v2.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: "image",
        });
        // Update database
        await (0, DB_1.connect)() `INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${`remove ${object} from image`},${imageUrl},'image')`;
        return res.status(200).json({
            message: "your object has removed successfully",
            success: true,
            image: imageUrl,
        });
    };
}
exports.default = new AiService();
