import { BigNumber } from 'ethers';

export interface SubnetInfo {
  stake: BigNumber;
  genesisEpoch: BigNumber;
  circSupply: BigNumber;
  topDownNonce: BigNumber;
  appliedBottomUpNonce: BigNumber;
  status: number;
  id: {
    root: BigNumber;
    route: BigNumber[];
  };
}

// SubnetID type expected by solidity contract
export interface SoliditySubnetID {
  root: number;
  route: string[];
}

export enum ConsensusType {
  Tendermint,
}

export interface SubnetConstructParams {
  parentId: SoliditySubnetID;
  ipcGatewayAddr: string;
  consensus: ConsensusType;
  minActivationCollateral: BigNumber;
  minValidators: number;
  bottomUpCheckPeriod: number;
  majorityPercentage: number;
  activeValidatorsLimit: number;
  minCrossMsgFee: BigNumber;
  powerScale: number;
}
