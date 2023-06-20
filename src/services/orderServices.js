const OrderModal = require("../models/OrderModal");

exports.createOrder = async (req) => {
  const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

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
      orders,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Fail to create order",
    };
  }
};
