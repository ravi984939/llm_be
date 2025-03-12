import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { vectorStore } from "../vector_store.ts";
import {llm} from '../chat_model.ts'
import { InputStateAnnotation, StateAnnotation } from "./states.ts";

const promptTemplate = pull<ChatPromptTemplate>("rlm/rag-prompt");
export const retrieve = async (state: typeof InputStateAnnotation.State) => {
  const retrievedDocs = await vectorStore.similaritySearch(state.question);
  return { context: retrievedDocs };
};

export const generate = async (state: typeof StateAnnotation.State) => {
  const docsContent = state.context.map((doc:any) => doc.pageContent).join("\n");
  const messages = await (await promptTemplate).invoke({
    question: state.question,
    context: docsContent,
  });
  const response = await llm.invoke(messages);
  return { answer: response };
};
