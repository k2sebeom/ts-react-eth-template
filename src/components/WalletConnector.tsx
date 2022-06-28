import { useETH } from '../hooks/useETH';


function WalletConnector() {
    const {
        currentAccount,
        activate
    } = useETH();

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        activate('metamask');
                    }}
                >
                    Connect MetaMask             
                </button>
                <button
                    onClick={() => {
                        activate('coinbase');
                    }}
                >
                    Connect Coinbase        
                </button>
                <button
                    onClick={() => {
                        activate('any');
                    }}
                >
                    Connect Any
                </button>
            </div>
            <h3>{currentAccount}</h3>
        </div>
    )
}

export default WalletConnector;