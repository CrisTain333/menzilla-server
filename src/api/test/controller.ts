import express, { Response, NextFunction } from "express";
import * as service from "./service";
// handle register
export const handleTest = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.test();
    res.send({
      status: 201,
      data: result,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
