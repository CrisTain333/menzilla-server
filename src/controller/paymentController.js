const paymentService = require("../services/paymentServices");

const paymentProcess = async (req, res, next) => {
  try {
    const result = await paymentService.paymentProcess(req);
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
  paymentProcess,
};
