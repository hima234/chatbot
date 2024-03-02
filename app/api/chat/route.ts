import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = "edge";

function buildPrompt(
  messages: { content: string; role: "system" | "user" | "assistant" }[]
) {
  return (
    messages
      .map(({ content, role }) => {
        if (role === "user") {
          return `<|prompter|>${content}<|endoftext|>`;
        } else {
          return `<|assistant|>${content}<|endoftext|>`;
        }
      })
      .join("") + "<|assistant|>"
  );
}

export async function POST(req: Request) {
  let { messages } = await req.json();

  const promptEngineering =
    "Act as a knowledged medical chatbot. You are an expert in helping people managing their health. If someone asks you something totally unrelated to health, you will respond with a generic text saying you are only trained to respond to health related queries. But if it touches health related query, then you should respond. The message is this: ";

  messages = messages.map(
    (message: { content: string; role: "system" | "user" | "assistant" }) => {
      if (message.role === "user") {
        return {
          ...message,
          content: `${promptEngineering} ${message.content}`,
        };
      } else {
        return message;
      }
    }
  );

  const response = Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: buildPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });

  const stream = HuggingFaceStream(response);

  return new StreamingTextResponse(stream);
}
