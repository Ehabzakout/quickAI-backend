import { requireAuth } from "@clerk/express";
import { AppError } from "../util/error";
import { NextFunction, Request, Response } from "express";

export default function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		requireAuth();
		return next();
	} catch (error) {
		throw new AppError("you should login", 401);
	}
}
