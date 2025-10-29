"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isAuthenticated;
const express_1 = require("@clerk/express");
const error_1 = require("../util/error");
function isAuthenticated(req, res, next) {
    try {
        (0, express_1.requireAuth)();
        return next();
    }
    catch (error) {
        throw new error_1.AppError("you should login", 401);
    }
}
