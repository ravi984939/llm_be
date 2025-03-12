import { StateGraph } from "@langchain/langgraph";
import {InputStateAnnotation,StateAnnotation} from './states.ts'
import {retrieve,generate} from "./nodes.ts";

export const graph = new StateGraph(StateAnnotation)
  .addNode("retrieve", retrieve)
  .addNode("generate", generate)
  .addEdge("__start__", "retrieve")
  .addEdge("retrieve", "generate")
  .addEdge("generate", "__end__")
  .compile();


