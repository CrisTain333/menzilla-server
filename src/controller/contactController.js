const contactService = require("../services/contactService");
const handleContact = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await contactService.handleContact(data);
    res.send({
      status: result?.status,
      message: result?.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleContact,
};
