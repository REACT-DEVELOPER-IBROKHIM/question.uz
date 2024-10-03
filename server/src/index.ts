import { corsConfig, dotEnvConfig, log } from "./config";
import { errorHandler } from './middlewares/errors/error-handler';
import express from "express";
import cors from "cors";
import chalk from 'chalk';
import mongoose from "mongoose";

import user from "./routes/user";

const server = express();

dotEnvConfig();

server.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use(cors(corsConfig));
server.use(express.json());
server.use("/api/v1/user", user);

server.use(errorHandler);

const PORT = process.env.PORT || 8000 as number;
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI)
    .then((() => log(chalk.green("CONNECTION ESTABLISHED WITH MONGO DB "))))
    .catch((err) => log(chalk.red(err.message)));

server.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
})