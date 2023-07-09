const express = require("express");
const {
  createConversation,
} = require("../../controller/chatController");
const router = express.Router();

router.post("/create-conversation", createConversation);

module.exports = router;
