// pages/api/get-completion.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { config } from 'dotenv';

config(); // Ensure this is called to load environment variables

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string, // TypeScript needs an assertion that the key is a string
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { userInput } = req.body;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: userInput }],
        model: "gpt-4"
      });

      // Send back the completion text as the response
      res.status(200).json({ response: completion.choices[0].message.content });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
