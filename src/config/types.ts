import { FC } from "react";
import { ChainScope } from "../config";
import { ConnectorNames } from "../utils/web3";

export { ConnectorNames } from "../utils/web3";

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: FC<any>;
  connectorId: ConnectorNames;
  priority: number;
}

export interface Chain {
  name: ChainScope;
  config: ChainConfig;
}

export interface ChainModel {
  chain: Chain;
  setChain: (chain: Chain) => void;
  matched: boolean;
}

export interface ChainConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}
