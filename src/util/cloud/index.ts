import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "../../config/envConfig";

export const connectCloudinary = async () => {
	cloudinary.config({
		cloud_name: envConfig.cloud_name!,
		api_key: envConfig.cloudinary_api_key!,
		api_secret: envConfig.cloudinary_secret!,
	});
};

export const uploadPhoto = async (
	file: string,
	path: string,
	options?: any
) => {
	const { public_id, secure_url } = await cloudinary.uploader.upload(file, {
		folder: `quickAI/images/${path}`,
		...options,
	});
	return { public_id, secure_url };
};
