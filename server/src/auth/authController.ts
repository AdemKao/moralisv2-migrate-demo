import { requestMessage, verifyMessage } from "./authService";
import { NextFunction, Request, Response } from "express";

export async function request(req: Request, res: Response, next: NextFunction) {
  try {
    const { address, chain, networkType } = req.body;
    console.log("server request", req.body);

    const message = await requestMessage({
      address,
      chain,
      networkType,
    });

    res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
}

export async function verify(req: Request, res: Response, next: NextFunction) {
  try {
    const { networkType: network, message, signature } = req.body;
    console.log("server verify", req.body);

    const user = await verifyMessage({
      network,
      message,
      signature,
    });

    console.log("||||||||||||||||||||||");
    console.log("caller ", user);

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}
