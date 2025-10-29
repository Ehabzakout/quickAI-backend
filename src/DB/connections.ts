import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { envConfig } from "../config/envConfig";

config();
const connect = () => {
	const sql = neon(envConfig.database_Url!);
	return sql;
};

export { connect };
