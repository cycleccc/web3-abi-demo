import { ethers } from 'ethers';

const chains = {
    mainnet: { chainId: '0x1', name: 'Ethereum Mainnet' },
    polygon: { chainId: '0x89', name: 'Polygon' },
};

const ChainSwitcher = ({
    provider,
}: {
    provider: ethers.providers.Web3Provider;
}) => {
    const switchChain = async (chainId: string) => {
        try {
            await provider.send('wallet_switchEthereumChain', [{ chainId }]);
            alert('Switched chain successfully!');
        } catch (error) {
            console.error('Failed to switch chain', error);
        }
    };

    return (
        <div className="space-x-2">
            {Object.values(chains).map(chain => (
                <button
                    key={chain.chainId}
                    onClick={() => switchChain(chain.chainId)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    {chain.name}
                </button>
            ))}
        </div>
    );
};

export default ChainSwitcher;
