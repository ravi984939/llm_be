import express from "express";
import llmRouter from "./routes/llm.ts";

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample API route
app.use("/llm", llmRouter);

// Start the server
const PORT = process.env.PORT || 2025;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
