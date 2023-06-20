const orderServices = require("../services/orderServices");
const createOrder = async (req, res, next) => {
  try {
    const result = await orderServices.createOrder(req);
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
  createOrder,
};
