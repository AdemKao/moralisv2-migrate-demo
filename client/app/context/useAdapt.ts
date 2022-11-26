import { createContext, useContext } from "react";
import { AdaptContextType } from "../types/types";

let defaultContext: AdaptContextType = {
  onConnect: null,
  onSignMessage: null,
  onDisConnect: null,
};
const AdaptContext = createContext<AdaptContextType>(defaultContext);
function useAdapt(): AdaptContextType {
  return useContext(AdaptContext);
}
export default AdaptContext;
export { useAdapt };
