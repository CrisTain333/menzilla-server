const ContactModal = require("../models/ContactModal");

exports.handleContact = async (data) => {
  try {
    await ContactModal.create(data);
    return {
      status: 200,
      message: "Successfully message sended",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Fail to send message",
    };
  }
};
