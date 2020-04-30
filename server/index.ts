import "tsconfig-paths/register";
import "./config/passport-config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { schema } from "./schema";
import compression from "compression";
import depthLimit from "graphql-depth-limit";
import morgan from "morgan";
import { sessionMiddleware, db_opts, corsOptions } from "@config/server-config";

const app = express();
const maintenance = require("./src/routes/maintenance");
const { DB_STRING, PORT, ENV } = dotenv.config().parsed;

(async () => {
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morgan("short"));
  app.use(compression());
  app.use(sessionMiddleware());
  app.use(passport.initialize());
  app.use(passport.session());

  await mongoose
    .connect(DB_STRING, db_opts)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));

  const server = new ApolloServer({
    introspection: ENV === "dev",
    playground: ENV === "dev",
    schema,
    validationRules: [depthLimit(5)],
    context: ({ req }) => {
      return {
        req,
      };
    },
  });
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`🚀 --- :${PORT}`));
  app.use("/", maintenance);
})();
