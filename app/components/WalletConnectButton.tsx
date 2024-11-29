import { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnectButton = ({
    onConnect,
}: {
    onConnect: (provider: ethers.providers.Web3Provider) => void;
}) => {
    const [address, setAddress] = useState<string | null>(null);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
        onConnect(provider);
    };

    return (
        <div>
            <button
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {address
                    ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
                    : 'Connect Wallet'}
            </button>
        </div>
    );
};

export default WalletConnectButton;
