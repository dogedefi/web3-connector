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
  config: any;
}

export interface ChainModel {
  chain: Chain;
  setChain: (chain: Chain) => void;
}
