export const runtime = "edge";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import fs from "node:fs";
import path from "node:path";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt, chatHistory } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [...chatHistory, { role: "user", content: prompt }],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new Response(stream, { status: 200 });
}
