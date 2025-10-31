import { Request, Response } from "express";
import { AppError } from "../../util/error";
import { AI } from "../../util/ai";

import { clerkClient, getAuth } from "@clerk/express";
import { connect } from "../../DB";
import axios from "axios";
import { envConfig } from "../../config/envConfig";

import { uploadPhoto } from "../../util/cloud";
import { v2 } from "cloudinary";
import { readFileSync } from "node:fs";

class AiService {
	generateArticle = async (req: Request, res: Response) => {
		const { prompt, length } = req.body;
		const { userId } = getAuth(req);

		const plan = req.plan!;
		const free_usage = req.free_usage!;

		if (plan !== "premium" && free_usage >= 10)
			throw new AppError(
				"You have all your limited requests upgrade your plan ",
				403
			);
		const response = await AI.chat.completions.create({
			model: "gemini-2.0-flash",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
			max_completion_tokens: length,
		});
		const article = response.choices[0]?.message.content;

		await connect()`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${article},'article')`;
		if (plan !== "premium") {
			await clerkClient.users.updateUserMetadata(userId!, {
				privateMetadata: {
					free_usage: free_usage + 1,
				},
			});
		}

		return res.status(200).json({ message: "success", success: true, article });
	};

	// generate Title
	generateTitle = async (req: Request, res: Response) => {
		const { prompt, length } = req.body;
		const plan = req.plan;
		const free_usage = req.free_usage;

		const { userId } = getAuth(req);

		if (plan !== "premium" && free_usage! >= 10)
			throw new AppError(
				"You have all your limited requests upgrade your plan ",
				403
			);
		const response = await AI.chat.completions.create({
			model: "gemini-2.0-flash",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
			max_completion_tokens: length,
		});
		const article = response.choices[0]?.message.content;

		await connect()`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${article},'blog title')`;
		if (plan !== "premium") {
			await clerkClient.users.updateUserMetadata(userId!, {
				privateMetadata: {
					free_usage: free_usage! + 1,
				},
			});
		}

		return res.status(200).json({ message: "success", success: true, article });
	};

	generateImage = async (req: Request, res: Response) => {
		const { prompt, published } = req.body;
		const { userId } = getAuth(req);

		if (req.plan !== "premium")
			throw new AppError("This feature is available for premium plan", 403);
		const formData = new FormData();
		formData.append("prompt", prompt);

		const response = await axios.post(`${envConfig.clip_drop_api}`, formData, {
			headers: { "x-api-key": envConfig.clip_drop_key },
			responseType: "arraybuffer",
		});

		const base64Image = `data:image/png;base64,${Buffer.from(
			response.data,
			"binary"
		).toString("base64")}`;
		const path = published ? `public` : `private/${userId}/images`;
		const photoData = await uploadPhoto(base64Image, path);

		await connect()`INSERT INTO creations (user_id,prompt,content,type,published) VALUES (${userId},${prompt},${JSON.stringify(
			photoData
		)},'image',${published ?? false})`;
		return res.status(201).json({
			message: "generated image success",
			success: true,
			content: photoData.secure_url,
			public: published,
		});
	};

	// Remove background
	removeBackground = async (req: Request, res: Response) => {
		const { userId } = getAuth(req);
		if (req.plan !== "premium")
			throw new AppError("you need to upgrade your plan", 403);
		if (!req.file) throw new AppError("No file uploaded", 400);
		const { secure_url, public_id } = await uploadPhoto(
			req.file.path,
			`private/${userId}/remove-background`,
			{
				transformation: [
					{
						effect: "background_removal",
						background_removal: "remove_the_background",
					},
				],
			}
		);

		// Update database

		await connect()`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},'remove background image',${secure_url},'image')`;

		return res.status(200).json({
			message: "your background has removed successfully",
			success: true,
			image: secure_url,
		});
	};

	// Remove Object
	removeObject = async (req: Request, res: Response) => {
		const { userId } = getAuth(req);
		if (req.plan !== "premium")
			throw new AppError("you need to upgrade your plan", 403);
		if (!req.file) throw new AppError("No file uploaded", 400);

		const { object } = req.body;
		const { secure_url, public_id } = await uploadPhoto(
			req.file.path,
			`private/${userId}/remove-object`
		);
		const imageUrl = v2.url(public_id, {
			transformation: [{ effect: `gen_remove:${object}` }],
			resource_type: "image",
		});

		// Update database

		await connect()`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${`remove ${object} from image`},${imageUrl},'image')`;

		return res.status(200).json({
			message: "your object has removed successfully",
			success: true,
			image: imageUrl,
		});
	};

	// Review Resume
	reviewResume = async (req: Request, res: Response) => {
		const { userId } = getAuth(req);
		const plan = req.plan;
		const resume = req.file;

		if (plan !== "premium")
			throw new AppError("You need to upgrade your plan", 403);
		if (!resume) throw new AppError("Can't get file", 400);
		if (resume.size > 4 * 1024 * 1024 || resume.mimetype !== "pdf")
			throw new AppError("Max file size is 4 MB, and .pdf", 400);
		const file = readFileSync(resume!.path, { encoding: "utf-8" });

		const prompt = `Review the following resume and provide constructive feedback on its strengthen, weaknesses, and areas for improvements. resume content: \n\n ${file}`;

		const response = await AI.chat.completions.create({
			model: "gemini-2.0-flash",
			messages: [{ role: "user", content: prompt }],
			temperature: 0.7,
			max_completion_tokens: 1000,
		});

		const content = response.choices[0]?.message.content;
		await connect()`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${content},'Review Resume')`;
		return res.status(200).json({
			message: "Your resume has been reviewed",
			success: true,
			content,
		});
	};
}

export default new AiService();
