import "tsconfig-paths/register";
import express from "express";
import { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./src/resolvers/index";
import { typeDefs } from "./types/index";
import { corsOpts } from "./config/server-config";
import cors from "cors";
import helmet from "helmet";
import { sessionMiddleware, db_opts } from "@config/server-config";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./config/passport-config";

interface IGraphQLContext {
  req: Request;
  res: Response;
}

const app = express();
const { DB_STRING, PORT } = dotenv.config().parsed;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

(async () => {
  app.use(cors(corsOpts));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(sessionMiddleware());
  app.use(cookieParser());

  app.use(passport.initialize());
  app.use(passport.session());

  await mongoose
    .connect(DB_STRING, db_opts)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: IGraphQLContext) => {
      console.log(req.session);
      return {
        req,
        res,
      };
    },
  });
  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`🚀 --- ${PORT}/graphql`));
})();
