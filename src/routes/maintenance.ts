import express from "express";
import { pingDB } from "@utils/pingDB";

const router = express.Router();
router.get("/status", async (_, __) => {
  __.json({
    status: "OK",
    protocol: "http",
    host: process.env.host,
    port: process.env.PORT,
    time: new Date().getTime(),
    db: await checkDB(),
  });
});

const checkDB = async () => {
  try {
    const db = await pingDB();
    console.log("Health check performed at: ", Date.now());
    if (db) return "CONNECTED";
  } catch (e) {
    return e.message;
  }
};

module.exports = router;
