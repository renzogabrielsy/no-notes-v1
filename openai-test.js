import OpenAI from "openai";
import { config } from "dotenv";

config(); // Ensure this is called to load environment variables

const apiKey = process.env.OPENAI_API_KEY; // Make sure this is the correct name of your environment variable
const openai = new OpenAI({
  apiKey: apiKey, // Pass the API key when instantiating the OpenAI object
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
    max_tokens: 150,
  });

  console.log(completion.choices[0]);
}

main();
