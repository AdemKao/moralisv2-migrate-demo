import { createContext, useContext } from "react";
import { Web3ContextType } from "../types/types";

let defaultContext = {
  account: undefined,
  chain: undefined,
  network: undefined,
  signMessage: undefined,
  signature: undefined,

  userName: undefined,
  description: undefined,
  avatar: undefined,
};
const Web3Context = createContext<Web3ContextType>(defaultContext);
export function useWeb3Context() {
  return useContext(Web3Context);
}
export default Web3Context;
