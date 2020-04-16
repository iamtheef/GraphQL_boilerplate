import * as dotenv from "dotenv";
const { PORT } = dotenv.config().parsed;

export const corsOpts = {
  credentials: true,
  origin: `http://localhost:${PORT}`,
};
