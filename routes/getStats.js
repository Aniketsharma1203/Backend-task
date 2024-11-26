import express from "express";
import { getStats } from "../controllers/getStats.js";

const router = express.Router();

router.get('/:shortId', getStats);

export default router;