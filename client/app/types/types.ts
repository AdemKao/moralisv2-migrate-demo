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

export interface walletConnectOption {
  account: string;
  chain: any;
  message: string;
}
type AdaptContextType = {
  onWalletConnect: () => Promise<walletConnectOption>;
  onMoralisAuth: (({}: walletConnectOption) => {}) | null;
  onDisConnect: (() => {}) | null;
  onSignMessage: (() => {}) | null;
};

export type { Web3ContextType, AdaptContextType };
