import "tsconfig-paths/register";
import express from "express";
import { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { schema } from "./schema";
import compression from "compression";
import depthLimit from "graphql-depth-limit";

import { sessionMiddleware, db_opts } from "@config/server-config";

import "./config/passport-config";

interface IGraphQLContext {
  req: Request;
  res: Response;
}

const app = express();
const { DB_STRING, PORT } = dotenv.config().parsed;

(async () => {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(sessionMiddleware());
  app.use(passport.initialize());
  app.use(passport.session());

  await mongoose
    .connect(DB_STRING, db_opts)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));

  const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(5)],
    context: ({ req }: IGraphQLContext) => {
      return {
        req,
      };
    },
  });
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`🚀 --- ${PORT}/graphql`));
})();
