import { Request, Response } from "express";
import { getTransactions } from "../db/transactions";

export const balanceHandler = (req: Request, res: Response) => {
  // Get all transactions from "database"
  const transactions = getTransactions();
  const balance: Record<string, number> = {};

  // Count points remaining from each transaction
  // Tally by payer
  transactions.forEach((transaction) => {
    if (!balance[transaction.payer]) {
      balance[transaction.payer] = 0;
    }
    balance[transaction.payer] += transaction.points;
  });

  // Return point balance
  res.status(200).json(balance);
};
