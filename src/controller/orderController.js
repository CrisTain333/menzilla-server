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

const getAllOrdersOfUser = async (req, res, next) => {
  try {
    const result = await orderServices.getAllOrders(req);
    res.send({
      status: result?.status,
      message: result?.message,
      data: result?.data,
      totalPages: result?.totalPages,
      currentPage: result?.currentPage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrdersOfUser,
};
