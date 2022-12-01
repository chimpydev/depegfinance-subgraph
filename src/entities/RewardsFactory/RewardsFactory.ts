// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CreatedStakingReward extends ethereum.Event {
  get params(): CreatedStakingReward__Params {
    return new CreatedStakingReward__Params(this);
  }
}

export class CreatedStakingReward__Params {
  _event: CreatedStakingReward;

  constructor(event: CreatedStakingReward) {
    this._event = event;
  }

  get marketEpochId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get mIndex(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get hedgeFarm(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get riskFarm(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RewardsFactory__createStakingRewardsResult {
  value0: Address;
  value1: Address;

  constructor(value0: Address, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }

  getInsr(): Address {
    return this.value0;
  }

  getRisk(): Address {
    return this.value1;
  }
}

export class RewardsFactory extends ethereum.SmartContract {
  static bind(address: Address): RewardsFactory {
    return new RewardsFactory("RewardsFactory", address);
  }

  createStakingRewards(
    _marketIndex: BigInt,
    _epochEnd: BigInt,
    _rewardDuration: BigInt,
    _rewardRate: BigInt
  ): RewardsFactory__createStakingRewardsResult {
    let result = super.call(
      "createStakingRewards",
      "createStakingRewards(uint256,uint256,uint256,uint256):(address,address)",
      [
        ethereum.Value.fromUnsignedBigInt(_marketIndex),
        ethereum.Value.fromUnsignedBigInt(_epochEnd),
        ethereum.Value.fromUnsignedBigInt(_rewardDuration),
        ethereum.Value.fromUnsignedBigInt(_rewardRate)
      ]
    );

    return new RewardsFactory__createStakingRewardsResult(
      result[0].toAddress(),
      result[1].toAddress()
    );
  }

  try_createStakingRewards(
    _marketIndex: BigInt,
    _epochEnd: BigInt,
    _rewardDuration: BigInt,
    _rewardRate: BigInt
  ): ethereum.CallResult<RewardsFactory__createStakingRewardsResult> {
    let result = super.tryCall(
      "createStakingRewards",
      "createStakingRewards(uint256,uint256,uint256,uint256):(address,address)",
      [
        ethereum.Value.fromUnsignedBigInt(_marketIndex),
        ethereum.Value.fromUnsignedBigInt(_epochEnd),
        ethereum.Value.fromUnsignedBigInt(_rewardDuration),
        ethereum.Value.fromUnsignedBigInt(_rewardRate)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new RewardsFactory__createStakingRewardsResult(
        value[0].toAddress(),
        value[1].toAddress()
      )
    );
  }

  factory(): Address {
    let result = super.call("factory", "factory():(address)", []);

    return result[0].toAddress();
  }

  try_factory(): ethereum.CallResult<Address> {
    let result = super.tryCall("factory", "factory():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  govToken(): Address {
    let result = super.call("govToken", "govToken():(address)", []);

    return result[0].toAddress();
  }

  try_govToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("govToken", "govToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _govToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _factory(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateStakingRewardsCall extends ethereum.Call {
  get inputs(): CreateStakingRewardsCall__Inputs {
    return new CreateStakingRewardsCall__Inputs(this);
  }

  get outputs(): CreateStakingRewardsCall__Outputs {
    return new CreateStakingRewardsCall__Outputs(this);
  }
}

export class CreateStakingRewardsCall__Inputs {
  _call: CreateStakingRewardsCall;

  constructor(call: CreateStakingRewardsCall) {
    this._call = call;
  }

  get _marketIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _epochEnd(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _rewardDuration(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _rewardRate(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class CreateStakingRewardsCall__Outputs {
  _call: CreateStakingRewardsCall;

  constructor(call: CreateStakingRewardsCall) {
    this._call = call;
  }

  get insr(): Address {
    return this._call.outputValues[0].value.toAddress();
  }

  get risk(): Address {
    return this._call.outputValues[1].value.toAddress();
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
