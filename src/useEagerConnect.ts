import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { connectorLocalStorageKey, ConnectorNames } from ".";

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, "BinanceChain", {
      get() {
        return this.bsc;
      },
      set(bsc) {
        this.bsc = bsc;

        resolve();
      },
    })
  );

// connect wallet eagerly
const useEagerConnect = () => {
  const [error, setError] = useState<any>(null);
  const { login } = useAuth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(
      connectorLocalStorageKey
    ) as ConnectorNames;

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC;
      const isBinanceChainDefined = Reflect.has(window, "BinanceChain");

      (async () => {
        try {
          // Currently BSC extension doesn't always inject in time.
          // We must check to see if it exists, and if not, wait for it before proceeding.
          if (isConnectorBinanceChain && !isBinanceChainDefined) {
            await _binanceChainListener();
            await login(connectorId);
            return;
          }

          await login(connectorId);
        } catch (error) {
          setError(error);
        }
      })();
    }
  }, [login]);

  return { error };
};

export default useEagerConnect;
