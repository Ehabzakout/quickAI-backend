import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export async function planAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { userId, has } = getAuth(req);
	const hasPremiumPlan = has({ plan: "premium" });
	const user = await clerkClient.users.getUser(userId!);

	if (!hasPremiumPlan && user.privateMetadata.free_usage) {
		req.free_usage = user.privateMetadata.free_usage as unknown as number;
	} else {
		await clerkClient.users.updateUserMetadata(userId!, {
			privateMetadata: {
				free_usage: 0,
			},
		});
		req.free_usage = 0;
	}
	req.plan = hasPremiumPlan ? "premium" : "free";

	next();
}
