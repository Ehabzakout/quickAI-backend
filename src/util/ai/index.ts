import OpenAI from "openai";
import { envConfig } from "../../config/envConfig";

export const AI = new OpenAI({
	apiKey: envConfig.ai_api_key,
	baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
