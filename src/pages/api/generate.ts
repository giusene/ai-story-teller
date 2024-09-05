// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from "next";


interface BodyI {
  prompt: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === "POST") {
    const { prompt } = req.body as BodyI;
    if (!prompt) {
      res.status(400).json("Body mancante");
    }
    
    try {
      if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY + "pippo");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        const output = (
          result.response.candidates as GenerateContentCandidate[]
        )[0].content.parts[0].text;

        if (output) {
          res.status(200).json({ok: true, message: output});
        }
      } else {
        res.status(400).json({ok: false, message: "Errore nella generazione (else)"});
      }
    } catch (e) {
      res.status(400).json({ok: false, message: "Errore nella generazione"});
    }

  } else {
    res.status(405).json("Metodo non gestito");
  }

}
