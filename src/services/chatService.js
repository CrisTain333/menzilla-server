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
        message: "Conversation already exist",
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
