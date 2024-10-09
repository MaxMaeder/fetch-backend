/**
 * Mock database to store transactions
 */

// A transaction, received from the add points endpoint
export interface Transaction {
  payer: string;
  points: number;
  timestamp: Date;
}

// List of transactions
const transactions: Transaction[] = [];

// Return all transactions as an array
const getTransactions = () => transactions;

// Add a transaction to list
const addTransaction = (transaction: Transaction) => {
  transactions.push(transaction);
};

export { getTransactions, addTransaction };
