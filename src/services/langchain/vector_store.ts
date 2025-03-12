import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "./embedding_model.ts";
export const vectorStore = new Chroma(embeddings, {
  collectionName: "a-test-collection",
});
