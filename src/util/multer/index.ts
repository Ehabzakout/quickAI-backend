import multer, { diskStorage } from "multer";

const storage = diskStorage({});

export const uploadFile = multer({
	storage,
	limits: { fieldSize: 4 * 1024 * 1024 },
});
