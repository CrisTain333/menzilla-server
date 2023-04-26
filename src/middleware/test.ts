import express, { Response, NextFunction } from "express";
export const test = (req: any, res: Response, next: NextFunction) => {
  console.log("Got Called");
  next();
};
