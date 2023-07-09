const express = require("express");
const {
  createConversation,
  createMessage,
  getSellerConversations,
} = require("../../controller/chatController");
const router = express.Router();

router.post("/create-conversation", createConversation);
router.get(
  "/seller-conversation/:id",
  getSellerConversations
);
router.post("/create-message", createMessage);

module.exports = router;
