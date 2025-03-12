import { Request, Response } from "express";
import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

//vector store and graph
import { vectorStore } from "../services/langchain/vector_store.ts";
import {graph} from '../services/langchain/langgraph/index.ts'

export const loadData = async (req: Request, res: Response) => {
  const url = req.body.url;
  if (url) {
    const tagSelector = "p"; //p tag is set to default to get the content
    const cheerioLoader = new CheerioWebBaseLoader(url, {
      selector: tagSelector,
    });
    const docs = await cheerioLoader.load();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const allSplits = await splitter.splitDocuments(docs);
    await vectorStore.addDocuments(allSplits);
    res.json({data:'Data loaded successfully'})
  } else {
    res.json({ data: "No data loaded" });
  }
};

export const queryData = async (req: Request, res: Response) => {
    const question = req.body.question;
    if(question){
        const graphResult= await graph.invoke({question})
        res.json({data:graphResult.answer});
    }else{
        res.json({data:'Question should not be empty'})
    }
};
