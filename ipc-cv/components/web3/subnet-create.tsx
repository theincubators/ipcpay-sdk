import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { IpcProvider } from '../../ipc-provider/src/provider';
import { SubnetID } from '../../ipc-provider/src/subnet';
import { CoinType, newDelegatedEthAddress } from '@glif/filecoin-address';

const SubnetCreate = ({
  validatorCount,
  minValidatorStake,
  bottomUpCheckPeriod,
  setShowButton,
}) => {
  const [message, setMessage] = useState(''); // New state for storing the message
  useEffect(() => {
    const initializeSubnet = async () => {
      const ipcProviderName = JSON.parse(localStorage.getItem('rootNetwork'));
      console.log(ipcProviderName);
      let provider = IpcProvider.newForNetwork(ipcProviderName);

      // Set a signer from private key
      const privKey = JSON.parse(localStorage.getItem('validator1KeyPairPK'));
      console.log('private key', privKey);
      provider.withSigner(privKey);

      // Create subnet
      console.log('Creating subnet...');
      const addr = await provider.CreateSubnet(
        SubnetID.newRoot(314159), //parent
        //hard coded for now
        1,
        BigNumber.from(10000000),
        BigNumber.from(1000000000),
        bottomUpCheckPeriod
      );
      setMessage(`Subnet actor deployed with addr: ${addr}`); // Update the message state

      localStorage.setItem('subnetActorAddress', JSON.stringify(addr));
      setShowButton(true);
    };

    initializeSubnet();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
      <div>Creating Subnet..</div>
      {message && ( // Conditional rendering of the message
        <div>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default SubnetCreate;
