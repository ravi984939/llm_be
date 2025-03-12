import express from "express";
import * as llmController from '../controller/llm.ts'
const router = express.Router();

// This routes loads the data
router.post("/load-data", llmController.loadData);

// This route query the data
router.post("/query-data", llmController.queryData);

export default router;
