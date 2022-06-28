import { useContext } from 'react';
import { EthereumContext, EthereumProvider } from './provider';


function useETH() {
    return useContext(EthereumContext);
}

export {
    useETH,
    EthereumContext,
    EthereumProvider
};