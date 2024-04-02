import {
  Address,
  ethAddressFromDelegated,
  newFromString,
  encode,
} from '@glif/filecoin-address';
import { SoliditySubnetID } from './types';

export class SubnetID {
  root: number;
  children: Address[];

  constructor(root: number, children: Address[]) {
    this.root = root;
    this.children = children;
  }

  static newFromParent(parent: SubnetID, subnetAct: Address): SubnetID {
    const children = parent.children.slice();
    children.push(subnetAct);
    return new SubnetID(parent.root, children);
  }

  static newRoot(rootId: number): SubnetID {
    return new SubnetID(rootId, []);
  }

  isRoot(): boolean {
    return this.children.length === 0;
  }

  toString(): string {
    let result = 'r' + this.root;

    for (const child of this.children) {
      result += '/' + child;
    }

    return result;
  }

  rootId(): number {
    return this.root;
  }

  subnetActor(): Address | undefined {
    if (this.children.length > 0) {
      return this.children[this.children.length - 1];
    } else {
      throw new Error('Root subnet has no subnet actor');
    }
  }

  subnetActorEthAddr(): string {
    // FIXME: use a way to set network type globally
    const subnetActor = this.subnetActor();
    if (subnetActor === undefined) {
      throw new Error('Subnet Actor is undefined');
    }
    return ethAddressFromDelegated(encode('t', subnetActor));
  }

  parent(): SubnetID | null {
    if (this.children.length === 0) {
      return null;
    }

    const children = this.children.slice();
    children.pop();
    return new SubnetID(this.root, children);
  }

  intoSolidity(): SoliditySubnetID {
    return {
      root: this.root,
      route: this.children.map((child) =>
        ethAddressFromDelegated(encode('t', child))
      ),
    };
  }

  equals(other: any): boolean {
    if (this === other) {
      console.log(1);
      return true;
    }

    if (!(other instanceof SubnetID)) {
      console.log(1);
      return false;
    }

    if (this.root !== other.root) {
      console.log(2);
      return false;
    }

    if (this.children.length !== other.children.length) {
      console.log(3);
      return false;
    }

    for (let i = 0; i < this.children.length; i++) {
      console.log(4);
      if (!this.children[i]?.equals(other.children[i])) {
        return false;
      }
    }

    return true;
  }
}
