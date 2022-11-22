type Web3ContextType = {
  account: string | undefined;
  chain: string | undefined;
  network: string | undefined;

  signMessage: string | undefined;
  signature: string | undefined;
  userName: string | undefined;
  description: string | undefined;
  avatar: string | undefined;
};

type AdaptContextType = {
  onConnect: (() => {}) | null;
  onDisConnect: (() => {}) | null;
};

export type { Web3ContextType, AdaptContextType };
