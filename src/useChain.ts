import { ChainScope } from 'config';
import { ChainModel } from 'config/types'
import { useCallback } from 'react'
import { chains, setupNetwork } from '.'

const useChain = ({ setChain }: ChainModel) => {
  const switchChain = useCallback(async (key: ChainScope) => {
    const config = { name: key, config: chains[key] };
    if (await setupNetwork(config)) {
      setChain(config);
    }
  }, []);

  return { switchChain }
}

export default useChain
