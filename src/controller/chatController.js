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

const createMessage = async (req, res, next) => {
  try {
    const result = await chatService.createMessages(req);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  createMessage,
};
