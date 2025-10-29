"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AI = void 0;
const openai_1 = __importDefault(require("openai"));
const envConfig_1 = require("../../config/envConfig");
exports.AI = new openai_1.default({
    apiKey: envConfig_1.envConfig.ai_api_key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
