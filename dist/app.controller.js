"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("@clerk/express");
const module_1 = require("./module");
const error_1 = require("./util/error");
const middleware_1 = require("./middleware");
const DB_1 = require("./DB");
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const cloud_1 = require("./util/cloud");
async function bootstrap(app, express) {
    (0, DB_1.connect)();
    app.use((0, cors_1.default)({ origin: "*" }));
    await (0, cloud_1.connectCloudinary)();
    app.use(express.json());
    app.use((0, express_1.clerkMiddleware)());
    app.use("/ai", auth_middleware_1.default, middleware_1.planAuth, module_1.aiRouter);
    app.use("/user", auth_middleware_1.default, middleware_1.planAuth, module_1.userRouter);
    app.all("/{*dumy}", () => {
        throw new error_1.AppError("Route not found", 404);
    });
    app.use((err, req, res, next) => {
        return res
            .status(err.statusCode || 500)
            .json({ error: err.message || "Server Error", success: false });
    });
}
