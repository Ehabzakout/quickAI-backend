"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const express_1 = require("@clerk/express");
const error_1 = require("../../util/error");
class UserService {
    // get all user creations
    getAllCreations = async (req, res) => {
        const { userId } = (0, express_1.getAuth)(req);
        const creations = await (0, DB_1.connect)() `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY createdAt DESC`;
        return res
            .status(200)
            .json({ message: "your creations", success: true, creations });
    };
    // get published creations
    getPublishedCreations = async (req, res) => {
        const creations = await (0, DB_1.connect)() `SELECT * FROM creations WHERE published = true ORDER BY createdAt DESC`;
        return res
            .status(200)
            .json({ message: "published creations", success: true, creations });
    };
    // Add and remove likes for creations
    toggleLike = async (req, res) => {
        const { userId } = (0, express_1.getAuth)(req);
        const user_id = userId?.toString();
        const { id } = req.params;
        const [creation] = await (0, DB_1.connect)() `SELECT * FROM creations WHERE id=${id} `;
        if (!creation)
            throw new error_1.AppError("Can't found creations with this id", 404);
        let likes = creation.likes;
        let message;
        if (likes.includes(user_id)) {
            likes = likes.filter((user_id) => user_id !== userId?.toString());
            message = "unLiked creation";
        }
        else {
            likes = [...likes, user_id];
            message = "creation liked";
        }
        await (0, DB_1.connect)() `UPDATE creations SET likes = ${likes} WHERE id = ${id}`;
        return res.status(200).json({ message, success: true });
    };
}
exports.default = new UserService();
