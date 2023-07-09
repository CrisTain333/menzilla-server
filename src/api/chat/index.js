const express = require("express");
const {
  createConversation,
  createMessage,
} = require("../../controller/chatController");
const router = express.Router();

router.post("/create-conversation", createConversation);
router.post("/create-message", createMessage);

module.exports = router;
