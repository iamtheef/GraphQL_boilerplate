import "tsconfig-paths/register";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { sessionMiddleware, corsOptions } from "@config/server-config";
import { schema } from "./schema";
import { pingDB } from "@utils/pingDB";
import { checkEnv, currentEnv } from "@config/environment";
import helmet from "helmet";
import passport from "passport";
import compression from "compression";
import depthLimit from "graphql-depth-limit";
import morgan from "morgan";
import cors from "cors";
import * as loaders from "src/dataloaders/index";
import "./config/passport-config";

const app = express();

checkEnv() &&
  (async () => {
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

    const server = new ApolloServer({
      subscriptions: false,
      introspection: currentEnv !== "PROD",
      playground: currentEnv !== "PROD",
      schema,
      validationRules: [depthLimit(5)],
      context: ({ req, res }) => {
        return {
          req,
          res,
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
