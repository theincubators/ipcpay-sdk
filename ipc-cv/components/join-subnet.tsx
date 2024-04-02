import React, { useState } from 'react';
import { IpcProvider } from '../ipc-provider/src/provider';
import { SubnetID } from '../ipc-provider/src/subnet';
import { BigNumber } from '@ethersproject/bignumber';
import { CoinType, newDelegatedEthAddress } from '@glif/filecoin-address';

const JoinSubnet = () => {
  const [output, setOutput] = useState('');
  const [isJoining, setIsJoining] = useState(false); // New state to track if joining is in progress

  const joinSubnet = async () => {
    setIsJoining(true); // Disable the button and show intermediate message
    setOutput('Joining Subnet...');

    const ipcProviderName = JSON.parse(localStorage.getItem('rootNetwork'));
    let provider = IpcProvider.newForNetwork(ipcProviderName);

    // Set a signer from private key
    const privKey = JSON.parse(localStorage.getItem('validator1KeyPairPK'));
    provider.withSigner(privKey);

    const subnetActorAddress = JSON.parse(
      localStorage.getItem('subnetActorAddress')
    );

    try {
      const tx = await provider.JoinSubnet(
        SubnetID.newFromParent(
          SubnetID.newRoot(314159),
          newDelegatedEthAddress(subnetActorAddress, CoinType.TEST)
        ),
        BigNumber.from(2000000000),
        BigNumber.from(2000000000)
      );

      setOutput(`Output: ${tx}`); // Update output state with the transaction result
    } catch (error) {
      setOutput(`Error: ${error.message}`); // In case of an error, update the output accordingly
    }

    setIsJoining(false); // Re-enable the button after operation is complete
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
      <div className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="p-8">Join the subnet</p>
        <button
          onClick={joinSubnet}
          disabled={isJoining} // Disable the button when isJoining is true
          className={`bg-blue-500 hover:bg-blue-700 text-white p-2 rounded button ${
            isJoining ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Join
        </button>
        {output && <p className="mt-4">{output}</p>} {/* Render the output */}
      </div>
    </div>
  );
};

export default JoinSubnet;
