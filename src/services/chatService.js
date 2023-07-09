const Conversation = require("../models/Conversation");

exports.createConverSation = async (req) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExist = await Conversation.findOne({
      groupTitle,
    });

    if (isConversationExist) {
      const conversation = isConversationExist;

      return {
        status: 201,
        message: "Conversation already exist",
        data: conversation,
      };
    } else {
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });
      return {
        status: 201,
        data: conversation,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: error.toString(),
    };
  }
};

exports.createMessages = async (req) => {};
exports.getSellerConversations = async (req) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    return {
      status: 201,
      message: "ok",
      data: conversations,
    };
    //  res.status(201).json({
    //    success: true,
    //    conversations,
    //  });
  } catch (error) {
    return {
      status: 500,
      message: error.toString(),
    };
  }
};
