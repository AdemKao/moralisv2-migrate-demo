import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
console.log("!!");

type UserProfile = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserProfile>
) {
  res.status(200).json({ name: "John Doe" });
}
