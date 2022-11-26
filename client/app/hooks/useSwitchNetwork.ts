import { useEffect, useState } from "react";
import { useChain } from "react-moralis";

type useSwitchNetworkType = {
  _chainId: string;
  networkType: "evm" | "sol";
};
const useSwitchNetwork = async ({
  _chainId,
  networkType = "evm",
}: useSwitchNetworkType) => {
  const { switchNetwork } = useChain();
  const [chainId, setChainId] = useState<string>();

  await switchNetwork(_chainId);
};

export default useSwitchNetwork;
