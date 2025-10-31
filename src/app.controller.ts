import type { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import { clerkMiddleware } from "@clerk/express";
import { aiRouter, userRouter } from "./module";
import { AppError } from "./util/error";
import { planAuth } from "./middleware";
import { connect } from "./DB";
import isAuthenticated from "./middleware/auth.middleware";
import { connectCloudinary } from "./util/cloud";

export async function bootstrap(app: Express, express: any) {
	connect();
	app.use(cors({ origin: "*" }));
	await connectCloudinary();
	app.use(express.json());
	app.use(clerkMiddleware());

	app.use("/ai", isAuthenticated, planAuth, aiRouter);
	app.use("/user", isAuthenticated, planAuth, userRouter);
	app.all("/{*dumy}", () => {
		throw new AppError("Route not found", 404);
	});
	app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
		return res
			.status(err.statusCode || 500)
			.json({ error: err.message || "Server Error", success: false });
	});
}
