import express from "express";
import { envConfig } from "./config/envConfig";
import { bootstrap } from "./app.controller";
import { connectCloudinary } from "./util/cloud";
const app = express();
const port = envConfig.port;

bootstrap(app, express);

app.listen(port, () => {
	console.log("Server is running on port", port);
});
