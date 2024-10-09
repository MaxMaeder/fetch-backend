import { Request, Response } from "express";
import { addTransaction, Transaction } from "../db/transactions";
import { addPointsSchema } from "../validators";

export const addPointsHandler = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validBody = await addPointsSchema.validate(req.body);

    // Parse timestamp
    // (yup can do this too but for type checking this is easier)
    const parsedBody: Transaction = {
      ...validBody,
      timestamp: new Date(validBody.timestamp),
    };

    // Add the transaction to the "database"
    addTransaction(parsedBody);

    res.sendStatus(200);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};
