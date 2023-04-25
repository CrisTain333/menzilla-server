import express from "express";
import testRoute from "../api/test/routes";

const routes = express.Router();

routes.use("/test", testRoute);

export default routes;
