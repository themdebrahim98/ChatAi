export const runtime = "edge";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const prevChats = messages.slice(0, -1);
    const question = messages[messages.length - 1].content;

    // // Ask OpenAI for a streaming completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content: `Please read given information and give answer. not forget to say thanks at the end
          
          
          
          `,
        },
        ...prevChats,
        { role: "user", content: question },
      ],
    });
    // // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
