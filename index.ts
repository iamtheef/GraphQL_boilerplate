import "tsconfig-paths/register";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { sessionMiddleware, corsOptions } from "@config/server-config";
import { schema } from "./schema";
import { pingDB } from "@utils/pingDB";
import { initDB } from "config/server-config";
import { setEnv } from "@config/enviroment";
import helmet from "helmet";
import passport from "passport";
import compression from "compression";
import depthLimit from "graphql-depth-limit";
import morgan from "morgan";
import cors from "cors";
import * as loaders from "src/dataloaders/index";
import "./config/passport-config";

const app = express();

(async () => {
  if (!setEnv()) return;
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(morgan("short"));
  app.use(compression());
  app.use(sessionMiddleware());
  app.use(passport.initialize());
  app.use(passport.session());

  pingDB().then((res) => {
    res.isConnected
      ? console.log("Connected to db!")
      : console.log(res.message);
  });

  await initDB();

  const server = new ApolloServer({
    introspection: process.env.ENV !== "PROD",
    playground: process.env.ENV !== "PROD",
    schema,
    validationRules: [depthLimit(5)],
    context: ({ req }) => {
      return {
        req,
        loaders,
      };
    },
  });
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () =>
    console.log(`🚀 --- :${process.env.PORT}`)
  );
  app.use("/", require("./src/routes/maintenance"));
})();
