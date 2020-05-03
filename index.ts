import "tsconfig-paths/register";
import "./config/passport-config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import { schema } from "./schema";
import compression from "compression";
import depthLimit from "graphql-depth-limit";
import morgan from "morgan";
import { sessionMiddleware, corsOptions } from "@config/server-config";
import { pingDB } from "@utils/pingDB";

const app = express();
const maintenance = require("./src/routes/maintenance");

(() => {
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morgan("short"));
  app.use(compression());
  app.use(sessionMiddleware());
  app.use(passport.initialize());
  app.use(passport.session());

  pingDB()
    .then(() => {
      console.log("Connected to db!");
    })
    .catch((e: Error) => console.log(e.message));

  const server = new ApolloServer({
    introspection: process.env.ENV !== "prod",
    playground: process.env.ENV !== "prod",
    schema,
    validationRules: [depthLimit(5)],
    context: ({ req }) => {
      return {
        req,
      };
    },
  });
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () =>
    console.log(`🚀 --- :${process.env.PORT}`)
  );
  app.use("/", maintenance);
})();
