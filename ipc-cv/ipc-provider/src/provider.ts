import { BigNumber, Wallet, ethers } from 'ethers';
import { Config, newConfigForNetwork } from './config';
import { importABIs } from './config';
import { SubnetInfo, SubnetConstructParams, ConsensusType } from './types';
import log from 'loglevel';

import { Contract, providers } from 'ethers';
import { SubnetID } from './subnet';
import { ethAddressFromDelegated } from '@glif/filecoin-address';

// Import IPC ABIs to make it available throughout the provider.
const contractABIs = importABIs();
const WAIT_TIMEOUT = 100000;

class Connection {
  provider: providers.JsonRpcProvider | Wallet;
  gatewayAddr: string;
  registryAddr: string;

  constructor(
    provider: providers.JsonRpcProvider | Wallet,
    gateway: string,
    registry: string
  ) {
    this.provider = provider;
    this.gatewayAddr = gateway;
    this.registryAddr = registry;
  }

  getContract(contractName: string, address: string): Contract {
    const abi = contractABIs[contractName].abi;

    if (!abi) {
      throw new Error(`ABI for contract ${contractName} not found.`);
    }

    const contract = new Contract(address, abi, this.provider);
    if (contract) {
      return contract;
    }

    throw new Error('contract not found');
  }

  getGatewayFacet(facetName: string): Contract {
    return this.getContract(facetName, this.gatewayAddr);
  }
}

export class IpcProvider {
  private config: Config;
  private privKey: string | undefined;

  constructor(config: Config) {
    this.config = config;
  }

  static newForNetwork(network: string): IpcProvider {
    return new IpcProvider(newConfigForNetwork(network));
  }

  withSigner(privKey: string) {
    this.privKey = privKey;
  }

  connection(subnet: SubnetID): Connection {
    const endpoint = this.config.subnets.get(subnet.toString())?.fevm
      .provider_http;
    if (endpoint) {
      const gateway = this.config.subnets.get(subnet.toString())?.fevm
        .gateway_addr;
      if (gateway === undefined) {
        throw new Error('Gateway is undefined');
      }
      const registry = this.config.subnets.get(subnet.toString())?.fevm
        .registry_addr;
      if (registry === undefined) {
        throw new Error('Registry is undefined');
      }
      if (this.privKey == undefined) {
        return new Connection(
          new providers.JsonRpcProvider(endpoint),
          gateway,
          registry
        );
      } else {
        return new Connection(
          new Wallet(this.privKey, new providers.JsonRpcProvider(endpoint)),
          gateway,
          registry
        );
      }
    }
    throw new Error('Subnet not configured in provider: ' + subnet);
  }

  async listSubnets(subnet: SubnetID): Promise<SubnetInfo[]> {
    const contract: any =
      this.connection(subnet).getGatewayFacet('GatewayGetterFacet');
    const subnets = await contract.listSubnets();

    let infos: SubnetInfo[] = [];
    for (const s of subnets) {
      const i: SubnetInfo = s;
      infos.push(i);
    }
    return infos;
  }

  async ParentFinality(subnet: SubnetID): Promise<SubnetInfo[]> {
    const contract: any =
      this.connection(subnet).getGatewayFacet('GatewayGetterFacet');
    throw new Error('Not implemented');
  }

  async LastBottomUpCheckpoint(subnet: SubnetID): Promise<BigNumber> {
    const contract: any =
      this.connection(subnet).getGatewayFacet('GatewayGetterFacet');
    return await contract.lastBottomUpCheckointHeight();
  }

  async CreateSubnet(
    parent: SubnetID,
    minValidators: number,
    minCrossMsgFee: BigNumber,
    minValidatorStake: BigNumber,
    checkpointPeriod: number
  ): Promise<string> {
    const conn: any = this.connection(parent);
    let contract = conn.getContract('SubnetRegistry', conn.registryAddr);

    const params: SubnetConstructParams = {
      parentId: parent.intoSolidity(),
      ipcGatewayAddr: conn.gatewayAddr,
      consensus: ConsensusType.Tendermint,
      minActivationCollateral: minValidatorStake,
      bottomUpCheckPeriod: checkpointPeriod,
      majorityPercentage: 66,
      activeValidatorsLimit: 100,
      powerScale: 3,
      minCrossMsgFee: minCrossMsgFee,
      minValidators: minValidators,
    };

    const transaction = await contract.newSubnetActor(params);
    // Wait for the transaction to be mined and get the receipt
    const receipt = await contract.provider.waitForTransaction(
      transaction.hash,
      { timeout: WAIT_TIMEOUT }
    );
    var abi = ['event SubnetDeployed(address)'];
    var iface = new ethers.utils.Interface(abi);

    for (const log of receipt.logs) {
      try {
        const parsedLog = iface.parseLog(log).args;
        return parsedLog[0];
      } catch (error) {
        continue; // Move to the next log if parsing fails
      }
    }
    throw new Error("Couldn't parse address of deployed subnet from receipt");
  }

  // Join the subnet and returns the epoch where the subnet was joined.
  async JoinSubnet(
    subnet: SubnetID,
    collateral: BigNumber,
    initialBalance: BigNumber
  ): Promise<number> {
    const parent = subnet.parent();
    if (parent == undefined) {
      throw new Error('Cannot join root subnet');
    }
    let subnetActorAddr = subnet.subnetActorEthAddr();
    const conn: any = this.connection(parent);
    let contract = conn.getContract('SubnetActorManagerFacet', subnetActorAddr);

    // if we need to send some initial balance
    if (!initialBalance.isZero()) {
      const transaction = await contract.preFund({ value: initialBalance });
      // Wait for the transaction to be mined and get the receipt
      await contract.provider.waitForTransaction(transaction.hash, {
        timeout: WAIT_TIMEOUT,
      });
    }
    // Infer the public key from the private key of the signer.
    if (this.privKey == undefined) {
      throw new Error('Provider not configured with signer');
    }
    const transaction = await contract.join(
      new ethers.Wallet(this.privKey).publicKey,
      { value: collateral }
    );
    // Wait for the transaction to be mined and get the receipt
    const receipt = await contract.provider.waitForTransaction(
      transaction.hash,
      { timeout: WAIT_TIMEOUT }
    );

    return receipt.blockNumber;
  }

  // async QuorumReachedEvents(subnet: SubnetID): Promise<SubnetInfo[]> {
  // 	throw new Error("Not implemented");
  // }

  // async CurrentEpoch(subnet: SubnetID): Promise<SubnetInfo[]> {
  // 	throw new Error("Not implemented");
  // }

  // async ListTopDownMsgs(subnet: SubnetID): Promise<SubnetInfo[]> {
  // 	throw new Error("Not implemented");
  // }
}
