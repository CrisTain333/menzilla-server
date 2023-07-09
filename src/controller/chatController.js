const chatService = require("../services/chatService");

const createConversation = async (req, res, next) => {
  try {
    const result = await chatService.createConverSation(
      req
    );
    res.send({
      status: result?.status,
      message: result?.message,
      data: result?.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
};
