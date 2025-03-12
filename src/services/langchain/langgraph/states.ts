import { Annotation } from "@langchain/langgraph";
import { Document } from "@langchain/core/documents";
// Define state for application
export const InputStateAnnotation = Annotation.Root({
  question: Annotation<string>,
});

export const StateAnnotation = Annotation.Root({
  question: Annotation<string>,
  context: Annotation<Document[]>,
  answer: Annotation<string>,
});