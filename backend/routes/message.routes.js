import express from "express";
import { sendMessage, getMessages } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage); // :id -> this is the user id that wants to send the message

export default router;
