const express = require("express");
const orderController = require("../../controller/orderController");
const router = express.Router();

router.post("/create-order", orderController.createOrder);
router.get("/:id", orderController.getAllOrdersOfUser);
router.get("/shop/:id", orderController.getAllOrdersOfShop);
router.get("/details/:id", orderController.getSingleOrder);
router.patch("/update-status", orderController.updateOrderStatus);

module.exports = router;
