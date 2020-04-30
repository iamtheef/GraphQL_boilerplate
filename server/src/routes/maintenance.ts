import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { db_opts } from "@config/server-config";
const router = express.Router();
const { DB_STRING, PORT } = dotenv.config().parsed;

router.get("/status", async (_, __) => {
  __.json({
    status: "OK",
    protocol: "http",
    host: "localhost",
    port: PORT,
    time: new Date().getTime(),
    db: await checkDB(),
  });
});

const checkDB = async () => {
  try {
    const db = await mongoose.connect(DB_STRING, db_opts);
    console.log("Health check performed at: ", Date.now());
    if (!!db) return "CONNECTED";
  } catch (e) {
    return e.message;
  }
};

module.exports = router;
