import express from 'express';
import { sendMessage } from '../controllers/messageControllers.js';

const router  = express();

router.post("/send",sendMessage);


export default router;