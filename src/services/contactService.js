const ContactModal = require("../models/ContactModal");

exports.handleContact = async (data) => {
  try {
    await ContactModal.create(data);
    return {
      status: 200,
      message:
        "Your message has been successfully submitted. Thank you for reaching out to us! We will get back to you as soon as possible",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Fail to send message",
    };
  }
};
