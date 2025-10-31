import { Request, Response } from "express";
import { connect } from "../../DB";
import { getAuth } from "@clerk/express";
import { AppError } from "../../util/error";

class UserService {
	// get all user creations
	getAllCreations = async (req: Request, res: Response) => {
		const { userId } = getAuth(req);
		const creations =
			await connect()`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY createdAt DESC`;
		return res
			.status(200)
			.json({ message: "your creations", success: true, creations });
	};

	// get published creations
	getPublishedCreations = async (req: Request, res: Response) => {
		const creations =
			await connect()`SELECT * FROM creations WHERE published = true ORDER BY createdAt DESC`;
		return res
			.status(200)
			.json({ message: "published creations", success: true, creations });
	};

	// Add and remove likes for creations
	toggleLike = async (req: Request, res: Response) => {
		const { userId } = getAuth(req);
		const user_id = userId?.toString();
		const { id } = req.params;
		const [creation] = await connect()`SELECT * FROM creations WHERE id=${id} `;
		if (!creation)
			throw new AppError("Can't found creations with this id", 404);

		let likes = creation.likes;
		let message;
		if (likes.includes(user_id)) {
			likes = likes.filter((user_id: string) => user_id !== userId?.toString());
			message = "unLiked creation";
		} else {
			likes = [...likes, user_id];
			message = "creation liked";
		}
		await connect()`UPDATE creations SET likes = ${likes} WHERE id = ${id}`;

		return res.status(200).json({ message, success: true });
	};
}

export default new UserService();
