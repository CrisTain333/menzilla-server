import express from "express";
import { handleTest } from "./controller";
import { test } from "../../middleware/test";

const router = express.Router();

router.use("/", test, handleTest);

export default router;
