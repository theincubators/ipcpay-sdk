import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';

const KeyPairGenerator = ({ setHasFunds, hasFunds }) => {
  const [publicAddress, setPublicAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [balance, setBalance] = useState('0');
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  useEffect(() => {
    const generateKeyPair = () => {
      const wallet = ethers.Wallet.createRandom();
      console.log('wallet');
      console.log(wallet.privateKey);

      setPublicAddress(wallet.address);
      setPrivateKey(wallet.privateKey);
      // Storing private keys in local storage is not recommended for production
      localStorage.setItem('validator1KeyPair', JSON.stringify(wallet));
      localStorage.setItem(
        'validator1KeyPairPK',
        JSON.stringify(wallet.privateKey)
      );
    };

    generateKeyPair();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    const rpcUrl = JSON.parse(localStorage.getItem('rootNetworkRPC'));
    console.log(rpcUrl);
    const web3 = new Web3(rpcUrl);
    const generateKeyPair = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const wallet = web3.eth.accounts.create();
        console.log(wallet);

        setPublicAddress(wallet.address);
        updateBalance(wallet.address);
      }
    };

    const updateBalance = async (address) => {
      const balance = await web3.eth.getBalance(address);
      setBalance(web3.utils.fromWei(balance, 'ether'));
      if (
        web3.utils.fromWei(balance, 'ether') !== web3.utils.fromWei(0, 'ether')
      ) {
        setHasFunds(true); // Update parent component when balance is non-zero
      }
    };

    generateKeyPair();

    const interval = setInterval(() => {
      if (publicAddress) {
        updateBalance(publicAddress);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [publicAddress]);
  const togglePrivateKeyDisplay = () => {
    setShowPrivateKey(!showPrivateKey);
  };
  return (
    <div>
      {publicAddress && (
        <div>
          {!hasFunds && (
            <>
              <p>Please use a faucet to add funds to your validator(s).</p>
              <p className="pt-4">
                This page is automatically refreshing your balance and will
                allow access the next step once your balance is greater than 0.
              </p>
            </>
          )}
          <div className="p-8" />
          <p>
            Validator Address1: {publicAddress} ({balance} coins)
            &nbsp;&nbsp;&nbsp;
          </p>
          {/*
          <button
            onClick={togglePrivateKeyDisplay}
           className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            {showPrivateKey ? 'Hide Private Key' : 'Display Private Key'}
          </button>
          {showPrivateKey && <p>Private Key: {privateKey}</p>}
          */}
        </div>
      )}
    </div>
  );
};

export default KeyPairGenerator;
