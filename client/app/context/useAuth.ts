import { createContext, useContext } from "react";
import { AuthContextType } from "../components/modules/Authenticate/types";
import { AdaptContextType } from "../types/types";

let defaultContext: AuthContextType = {
  walletAuthContext: undefined,
  serverAuthContext: undefined,

  //   account: null,
  //   networkType: null,
  //   chain: null,
};
const AuthContext = createContext<AuthContextType>(defaultContext);
function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
export default AuthContext;
export { useAuth };
