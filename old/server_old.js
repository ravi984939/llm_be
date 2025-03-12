import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Ollama } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load the local LLM (Llama 3 via Ollama)
const llm = new Ollama({ model: "llama3.2" });

// Initialize in-memory vector store (Use ChromaDB for persistence)
const vectorStore = new MemoryVectorStore(new OllamaEmbeddings({model:'llama3.2'}));

// Function to add documents to the vector store
const addDocument = async (text) => {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
    const docs = await textSplitter.createDocuments([text]);
    await vectorStore.addDocuments(docs);
};

// API to add documents
app.post("/add-data", async (req, res) => {
    try {
        console.log('hey hello')
        const { text } = req.body;
        await addDocument(text);
        res.json({ message: "Document added to RAG memory!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to query documents using RAG
app.post("/query", async (req, res) => {
    try {
        const { query } = req.body;
        const retriever = vectorStore.asRetriever();
        const docs = await retriever.invoke(query);

        const context = docs.map(d => d.pageContent).join("\n");
        const prompt = `Use the following data to answer the query:\n${context}\n\nQuery: ${query}`;

        const response = await llm.invoke(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
