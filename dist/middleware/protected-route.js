"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planAuth = planAuth;
const express_1 = require("@clerk/express");
async function planAuth(req, res, next) {
    const { userId, has } = (0, express_1.getAuth)(req);
    const hasPremiumPlan = has({ plan: "premium" });
    const user = await express_1.clerkClient.users.getUser(userId);
    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
        req.free_usage = user.privateMetadata.free_usage;
    }
    else {
        await express_1.clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                free_usage: 0,
            },
        });
        req.free_usage = 0;
    }
    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
}
