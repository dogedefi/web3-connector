// initial chain info
import { useEffect, useState } from "react";
import { chainLocalKey, ChainScope } from "./config";
import { chains } from "./config/chains";
import { Chain as DataType } from "./config/types";
import { setupNetwork } from "./utils/network";

const defaultChain: DataType = { name: ChainScope.BSC, config: chains.BSC };

export const initChainModel = () => {
  const [chain, setChain] = useState<DataType>(defaultChain);

  // initial chain config
  useEffect(() => {
    let chainConfig = localStorage.getItem(chainLocalKey);

    if (!chainConfig) {
      setupNetwork(defaultChain);
    } else if (chainConfig.startsWith("{") && chainConfig.endsWith("}")) {
      const cachedChain = JSON.parse(chainConfig);
      setChain(cachedChain);
      setupNetwork(cachedChain);
    } else {
      localStorage.clear();
      location.reload();
    }
  }, []);

  return { chain, setChain };
};

// export
export { Config, Chain } from "./config/types";
export { default as connectors } from "./config/wallet";
export { chains } from "./config/chains";
export * from "./config";

export { default as useAuth } from "./useAuth";
export { default as useWallet } from "./useWallet";
export { default as useChain } from "./useChain";
export { default as useEagerConnect } from "./useEagerConnect";

export { getLibrary, ConnectorNames, connectorsByName } from "./utils/web3";
export { setupNetwork } from "./utils/network";

export * from "@web3-react/core";
