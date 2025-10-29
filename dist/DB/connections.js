"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const serverless_1 = require("@neondatabase/serverless");
const dotenv_1 = require("dotenv");
const envConfig_1 = require("../config/envConfig");
(0, dotenv_1.config)();
const connect = () => {
    const sql = (0, serverless_1.neon)(envConfig_1.envConfig.database_Url);
    return sql;
};
exports.connect = connect;
