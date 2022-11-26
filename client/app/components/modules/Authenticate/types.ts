type WalletAuthContextType = {
  onConnectWallet: () => {} | null | undefined;
  account: string | null | undefined;
  networkType: "nvm" | "sol" | null | undefined;
  chain: number | string | null | undefined;

  onSignMessage: () => {} | null | undefined;
  signature: string | null | undefined;
};
type ServerAuthContextType = {
  onReuestMessage: () => {} | null | undefined;
  message: string | null | undefined;

  onVerifyMessage: () => {} | null | undefined;
  user: any | null | undefined;
};

type AuthContextType = {
  walletAuthContext: WalletAuthContextType | null | undefined;
  serverAuthContext: ServerAuthContextType | null | undefined;
};

export type { AuthContextType };
