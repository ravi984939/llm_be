import { Ollama } from "@langchain/ollama";

export const llm = new Ollama({ model: "llama3.2" });



//open-ai related code
// import { ChatOpenAI } from "@langchain/openai";

// export const llm = new ChatOpenAI({
//   model: "gpt-4o-mini",
//   temperature: 0
// });


// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "",
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));

