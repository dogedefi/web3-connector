// initial chain info
import { useEffect, useState } from "react";
import { chainLocalKey, ChainScope } from "./config";
import { chains } from "./config/chains";
import { Chain as DataType } from "./config/types";
import { setupNetwork, checkIfMatch, getProvider } from "./utils/network";

const defaultChain: DataType = { name: ChainScope.BSC, config: chains.BSC };

export const initChainModel = () => {
  const [matched, setMatched] = useState(false);
  const [signal, setSignal] = useState(false);
  const [chain, setChain] = useState<DataType>(defaultChain);

  // initial chain config
  useEffect(() => {
    let chainConfig = localStorage.getItem(chainLocalKey);

    if (!chainConfig) {
      // TODO explore way if switch
      // setupNetwork(defaultChain);
      checkIfMatch(defaultChain).then((res) => setMatched(res));
    } else if (chainConfig.startsWith("{") && chainConfig.endsWith("}")) {
      const cachedChain = JSON.parse(chainConfig);
      setChain(cachedChain);
      checkIfMatch(cachedChain).then((res) => setMatched(res));
      setupNetwork(cachedChain);
    } else {
      localStorage.clear();
      location.reload();
    }
  }, []);

  useEffect(() => {
    const provider: any = getProvider();
    const reload = () => setSignal(true);
    if (provider) {
      provider.on("chainChanged", reload);
      provider.on("accountsChanged", reload);
    }

    return () => {
      provider.removeListener("chainChanged", reload);
      provider.removeListener("accountsChanged", reload);
    };
  }, []);

  return { chain, setChain, matched, signal };
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
