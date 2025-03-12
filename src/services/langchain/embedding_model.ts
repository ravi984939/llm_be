import { OllamaEmbeddings } from "@langchain/ollama";

export const embeddings = new OllamaEmbeddings({ model: "llama3.2" });

// import { OpenAIEmbeddings } from "@langchain/openai";

// export const embeddings = new OpenAIEmbeddings({
//   model: "text-embedding-3-large"
// });
