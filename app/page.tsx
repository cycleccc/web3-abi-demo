'use client';
import { useState } from 'react';
import WalletConnectButton from './components/WalletConnectButton';
import ChainSwitcher from './components/ChainSwitcher';
import ContractForm from './components/ContractForm';
import { ethers } from 'ethers';

const Home = () => {
    const [provider, setProvider] =
        useState<ethers.providers.Web3Provider | null>(null);

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Web3 ABI Dynamic UI</h1>
            <WalletConnectButton onConnect={setProvider} />
            {provider && <ChainSwitcher provider={provider} />}
            {provider && <ContractForm provider={provider} />}
        </div>
    );
};

export default Home;
