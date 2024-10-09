import { Request, Response } from "express";
import { spendPointsSchema } from "../validators";
import { spendPointsLogic } from "../logic/spendPointsLogic";

export const spendPointsHandler = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validBody = await spendPointsSchema.validate(req.body);

    // Run spend point logic
    const pointsSpent = spendPointsLogic(validBody.points);

    // Return payers/points used to spend points
    res.status(200).json(pointsSpent);
  } catch (err) {
    res.status(400).send((err as Error).message);
  }
};
