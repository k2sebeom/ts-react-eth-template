import { ethers } from 'ethers';

type WalletType = 'any' | 'metamask' | 'coinbase';

type EthereumContextArgs = {
    chainId: string,
    accounts: string[],
    currentAccount: string,
    provider: any,
    etherProvider: null | ethers.providers.Web3Provider,
    activate: (walletName: WalletType) => void,
    switchChain: (chainId: string) => void
}

export type {
    WalletType,
    EthereumContextArgs
}