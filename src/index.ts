export { Config, Chain } from './config/types'
export { default as connectors } from './config/wallet'
export { chains } from './config/chains'
export {
  connectorLocalStorageKey,
  connectorLocalStorageKeyV2,
  walletLocalStorageKey,
  connectedKey,
  chainLocalKey
} from './config'

export { default as useAuth } from './useAuth'
export { default as useWallet } from './useWallet'
export { default as useChain } from './useChain'

export { getLibrary, ConnectorNames, connectorsByName } from './utils/web3'
export { setupNetwork } from './utils/network'
