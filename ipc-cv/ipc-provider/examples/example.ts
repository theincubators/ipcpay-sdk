// Run  npx ts-node example.ts

import { BigNumber, ethers } from 'ethers';
import { IpcProvider } from '../src/provider';
import { SubnetID } from '../src/subnet';
import { CoinType, newDelegatedEthAddress } from '@glif/filecoin-address';

async function example() {
  let provider = IpcProvider.newForNetwork('calibration');

  // Set a signer from private key
  const privKey =
    '3387de68c9cf29cb7c303fd7641d0f6c928ae390fbe648342bccccd7a3720544';
  provider.withSigner(privKey);

  // Crate subnet
  console.log('Creating subnet...');
  const addr = await provider.CreateSubnet(
    SubnetID.newRoot(314159),
    1,
    BigNumber.from(10000000),
    BigNumber.from(1000000000),
    30
  );
  console.log('Subnet actor deployed with addr: ' + addr);

  // Join subnet
  console.log('Joining subnet...');
  console.log(
    await provider.JoinSubnet(
      // FIXME: Make cointype configurable according to the type of network.
      // For now all of them are testnet
      SubnetID.newFromParent(
        SubnetID.newRoot(314159),
        newDelegatedEthAddress(addr, CoinType.TEST)
      ),
      BigNumber.from(2000000000),
      BigNumber.from(2000000000)
    )
  );
}

example();
