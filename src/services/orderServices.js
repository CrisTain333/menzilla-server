const OrderModal = require("../models/OrderModal");

exports.createOrder = async (req) => {
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
  console.log(cart);

  try {
    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await OrderModal.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    return {
      message: "order created successfully",
      status: 200,
      data: orders,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Fail to create order",
    };
  }
};

exports.getAllOrders = async (req) => {
  const limit = 8;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const userId = req.params.id;

  try {
    const count = await OrderModal.find({
      "user._id": userId,
    }).countDocuments();

    const orders = await OrderModal.find({ "user._id": userId })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(parseInt(limit));

    if (!orders) {
      return {
        message: "Orders not found",
        status: 404,
      };
    }
    return {
      status: 200,
      message: "ok",
      data: orders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    return {
      status: 500,
      message: "fail to get user orders",
    };
  }
};

exports.getShopAllOrders = async (req) => {
  const limit = 6;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const shopId = req.params.id;

  try {
    const count = await OrderModal.find({
      "cart.product.shopId": shopId,
    }).countDocuments();

    const orders = await OrderModal.find({
      "cart.product.shopId": shopId,
    })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(parseInt(limit));

    return {
      status: 200,
      message: "ok",
      data: orders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    return {
      status: 500,
      message: "fail to get shop orders",
    };
  }
};

exports.getSingleOrder = async (req) => {
  const orderId = req.params.id;
  const data = OrderModal.findById(orderId);
  if (!data) {
    return {
      status: 404,
      message: "Data not found",
    };
  } else {
    return {
      data,
      message: "ok",
      status: 200,
    };
  }
};
