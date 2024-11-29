import { useState } from 'react';
import { ethers } from 'ethers';

const ContractForm = ({
    provider,
}: {
    provider: ethers.providers.Web3Provider;
}) => {
    const [abi, setAbi] = useState('');
    const [address, setAddress] = useState('');
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const loadContract = () => {
        try {
            const parsedAbi = JSON.parse(abi);
            const newContract = new ethers.Contract(
                address,
                parsedAbi,
                provider.getSigner(),
            );
            setContract(newContract);
        } catch (error) {
            alert('Invalid ABI or address!');
        }
    };

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const callMethod = async (methodName: string, inputs: any[]) => {
        if (!contract) return;
        try {
            const result = await contract[methodName](...inputs);
            alert(`Call success: ${JSON.stringify(result)}`);
        } catch (error) {
            console.error('Error calling method', error);
        }
    };

    return (
        <div className="space-y-4">
            <textarea
                placeholder="Paste ABI JSON here"
                className="w-full border p-2"
                value={abi}
                onChange={e => setAbi(e.target.value)}
            />
            <input
                placeholder="Contract Address"
                className="w-full border p-2"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
            <button
                onClick={loadContract}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Load Contract
            </button>
            {contract && (
                <div>
                    {Object.keys(contract.interface.functions).map(method => (
                        <div key={method} className="border p-4 mb-4">
                            <h3>{method}</h3>
                            <div className="space-y-2">
                                {contract.interface.functions[
                                    method
                                ].inputs.map((input: any, index: number) => (
                                    <input
                                        key={index}
                                        placeholder={`${input.name} (${input.type})`}
                                        className="w-full border p-2"
                                        onChange={e =>
                                            handleInputChange(
                                                `${method}_${index}`,
                                                e.target.value,
                                            )
                                        }
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() =>
                                    callMethod(
                                        method,
                                        contract.interface.functions[
                                            method
                                        ].inputs.map(
                                            (_, index: number) =>
                                                formData[`${method}_${index}`],
                                        ),
                                    )
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
                            >
                                Call {method}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContractForm;
