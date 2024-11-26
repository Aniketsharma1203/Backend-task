import express from "express";
import { handleUrl } from "../controllers/urls.js";
import { giveUrl } from "../controllers/urls.js";


const router = express.Router();

router.post('/shorten', handleUrl);
router.get('/:shortId', giveUrl);

export default router;