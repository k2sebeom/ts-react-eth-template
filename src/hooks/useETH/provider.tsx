import { createContext, useState } from "react";
import { ethers } from 'ethers';
import { EthereumContextArgs, WalletType } from '../../@types/EthereumContext';



const walletAttr: {[key: string]: string} = {
    'metamask': 'isMetaMask',
    'coinbase': 'isCoinbaseWallet'
};

function selectProvider(walletName: WalletType): any {
    if(walletName === 'any') {
        return window.ethereum;
    }

    const attr = walletAttr[walletName];

    if(window.ethereum.providers) {
        for(const p of window.ethereum.providers) {
            if(p[attr]) {
                return p;
            }
        }
        return null;
    }
    else {
        if(!window.ethereum[attr]) {
            return null;
        }
        else {
            return window.ethereum;
        }
    }
}

const EthereumContext = createContext<EthereumContextArgs>({
    chainId: '0x1',
    accounts: [''],
    currentAccount: '',
    provider: null,
    etherProvider: null,
    activate: (walletName: string) => {},
    switchChain: (chainId: string) => {}
});


const EthereumProvider = ({ children }: any) => {
    const [chainId, setChainId] = useState<string>('');
    const [accounts, setAccounts] = useState<string[]>([]);
    const [currentAccount, setCurrentAccount] = useState<string>('');

    const [provider, setProvider] = useState<any>(null);
    const [etherProvider, setEtherProvider] = useState<ethers.providers.Web3Provider | null>(null);

    const switchChain = async (chainId: string) => {
        if(provider) {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }]
            });
        }
    }

    const activate = async (walletName: WalletType) => {
        const p = selectProvider(walletName);
        setProvider(p)
        setEtherProvider(new ethers.providers.Web3Provider(p));
    
        if(p.on && p._eventsCount < 2) {
            p.on('connect', ({ chainId }: any) => {
                console.log(`Connceted with ${chainId}`);
            })
    
            p.on('chainChanged', (chainId: string) => {
                console.log(`Chain changed to ${chainId}`);
                setChainId(chainId);
                setEtherProvider(new ethers.providers.Web3Provider(p));
            });
    
            p.on('accountsChanged', (accounts: string[]) => {
                console.log(`New accounts ${accounts}`);
                setAccounts(accounts);
                if(accounts.length === 0) {
                    setCurrentAccount('');
                }
                else {
                    setCurrentAccount(accounts[0]);
                }
            });
        }
        const ethAccounts = await p.request({ method: 'eth_accounts' });
        if(ethAccounts.length === 0) {
            await p.enable();
        }

        setAccounts(p._state.accounts)
        setCurrentAccount(p.selectedAddress);
        setChainId(p.chainId);
    }

    return (
        <EthereumContext.Provider
            value={{
                chainId,
                accounts,
                currentAccount,
                provider,
                etherProvider,
                activate,
                switchChain
            }}
        >
            {children}
        </EthereumContext.Provider>
    )
}


export {
    EthereumProvider,
    EthereumContext
}
