import express from "express";
import { addPointsHandler } from "./handlers/addPointsHandler";
import { spendPointsHandler } from "./handlers/spendPointsHandler";
import { balanceHandler } from "./handlers/balanceHandler";

const app = express();
const PORT = 8000;

// Parse JSON body
app.use(express.json());

// Define endpoints
app.post("/add", addPointsHandler);
app.post("/spend", spendPointsHandler);
app.get("/balance", balanceHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
