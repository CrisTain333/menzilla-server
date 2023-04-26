const testServices = require("../services/testServices");

const testController = async (req, res, next) => {
  try {
    const result = await testServices.getUser();
    res.send({
      data: result?.data,
      status: result?.status,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { testController };
