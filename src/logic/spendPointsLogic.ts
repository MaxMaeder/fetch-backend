import { getTransactions } from "../db/transactions";

interface PointsSpent {
  [payer: string]: number;
}

// Logic to spend points, spending oldest first and not letting
//   a payer's points dropping below zero
export const spendPointsLogic = (spendPoints: number): PointsSpent => {
  const transactions = getTransactions();

  // Sort transactions by timestamp
  const sortedTransactions = [...transactions].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  const pointsSpent: PointsSpent = {};
  let totalPointsToSpend = spendPoints;

  // Iterate over transactions from back to front, subtracting points
  sortedTransactions.forEach((transaction) => {
    if (totalPointsToSpend <= 0) return;

    const pointsToSpend = Math.min(transaction.points, totalPointsToSpend);

    if (!pointsSpent[transaction.payer]) {
      pointsSpent[transaction.payer] = 0;
    }

    // Update spent points for payer
    pointsSpent[transaction.payer] -= pointsToSpend;
    transaction.points -= pointsToSpend;
    totalPointsToSpend -= pointsToSpend;
  });

  return pointsSpent;
};
