// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const risposta = {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
  }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {

  

  if (req.method === "GET") {
    res.status(200).json(risposta);
  } else if (req.method === "POST") {
    const {saluto} = JSON.parse(req.body)
    if (saluto) {
      res.status(200).json("HELLO!!!!");
    } else {
      res.status(404).json("Manca saluto");
    }
  } else {
    res.status(400).json("Metodo non gestito");
  }

}
