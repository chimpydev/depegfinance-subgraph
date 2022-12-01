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

export class DepegInsurance extends ethereum.Event {
  get params(): DepegInsurance__Params {
    return new DepegInsurance__Params(this);
  }
}

export class DepegInsurance__Params {
  _event: DepegInsurance;

  constructor(event: DepegInsurance) {
    this._event = event;
  }

  get epochMarketID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tvl(): DepegInsuranceTvlStruct {
    return changetype<DepegInsuranceTvlStruct>(
      this._event.parameters[1].value.toTuple()
    );
  }

  get isDisaster(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }

  get epoch(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get time(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get depegPrice(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class DepegInsuranceTvlStruct extends ethereum.Tuple {
  get RISK_claimTVL(): BigInt {
    return this[0].toBigInt();
  }

  get RISK_finalTVL(): BigInt {
    return this[1].toBigInt();
  }

  get INSR_claimTVL(): BigInt {
    return this[2].toBigInt();
  }

  get INSR_finalTVL(): BigInt {
    return this[3].toBigInt();
  }
}

export class NullEpoch extends ethereum.Event {
  get params(): NullEpoch__Params {
    return new NullEpoch__Params(this);
  }
}

export class NullEpoch__Params {
  _event: NullEpoch;

  constructor(event: NullEpoch) {
    this._event = event;
  }

  get epochMarketID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get tvl(): NullEpochTvlStruct {
    return changetype<NullEpochTvlStruct>(
      this._event.parameters[1].value.toTuple()
    );
  }

  get epoch(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get time(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NullEpochTvlStruct extends ethereum.Tuple {
  get RISK_claimTVL(): BigInt {
    return this[0].toBigInt();
  }

  get RISK_finalTVL(): BigInt {
    return this[1].toBigInt();
  }

  get INSR_claimTVL(): BigInt {
    return this[2].toBigInt();
  }

  get INSR_finalTVL(): BigInt {
    return this[3].toBigInt();
  }
}

export class Controller extends ethereum.SmartContract {
  static bind(address: Address): Controller {
    return new Controller("Controller", address);
  }

  getLatestPrice(_token: Address): BigInt {
    let result = super.call(
      "getLatestPrice",
      "getLatestPrice(address):(int256)",
      [ethereum.Value.fromAddress(_token)]
    );

    return result[0].toBigInt();
  }

  try_getLatestPrice(_token: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getLatestPrice",
      "getLatestPrice(address):(int256)",
      [ethereum.Value.fromAddress(_token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getVaultFactory(): Address {
    let result = super.call(
      "getVaultFactory",
      "getVaultFactory():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_getVaultFactory(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getVaultFactory",
      "getVaultFactory():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  vaultFactory(): Address {
    let result = super.call("vaultFactory", "vaultFactory():(address)", []);

    return result[0].toAddress();
  }

  try_vaultFactory(): ethereum.CallResult<Address> {
    let result = super.tryCall("vaultFactory", "vaultFactory():(address)", []);
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

  get _factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _l2Sequencer(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class TriggerDepegCall extends ethereum.Call {
  get inputs(): TriggerDepegCall__Inputs {
    return new TriggerDepegCall__Inputs(this);
  }

  get outputs(): TriggerDepegCall__Outputs {
    return new TriggerDepegCall__Outputs(this);
  }
}

export class TriggerDepegCall__Inputs {
  _call: TriggerDepegCall;

  constructor(call: TriggerDepegCall) {
    this._call = call;
  }

  get marketIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get epochEnd(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TriggerDepegCall__Outputs {
  _call: TriggerDepegCall;

  constructor(call: TriggerDepegCall) {
    this._call = call;
  }
}

export class TriggerEndEpochCall extends ethereum.Call {
  get inputs(): TriggerEndEpochCall__Inputs {
    return new TriggerEndEpochCall__Inputs(this);
  }

  get outputs(): TriggerEndEpochCall__Outputs {
    return new TriggerEndEpochCall__Outputs(this);
  }
}

export class TriggerEndEpochCall__Inputs {
  _call: TriggerEndEpochCall;

  constructor(call: TriggerEndEpochCall) {
    this._call = call;
  }

  get marketIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get epochEnd(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TriggerEndEpochCall__Outputs {
  _call: TriggerEndEpochCall;

  constructor(call: TriggerEndEpochCall) {
    this._call = call;
  }
}

export class TriggerNullEpochCall extends ethereum.Call {
  get inputs(): TriggerNullEpochCall__Inputs {
    return new TriggerNullEpochCall__Inputs(this);
  }

  get outputs(): TriggerNullEpochCall__Outputs {
    return new TriggerNullEpochCall__Outputs(this);
  }
}

export class TriggerNullEpochCall__Inputs {
  _call: TriggerNullEpochCall;

  constructor(call: TriggerNullEpochCall) {
    this._call = call;
  }

  get marketIndex(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get epochEnd(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TriggerNullEpochCall__Outputs {
  _call: TriggerNullEpochCall;

  constructor(call: TriggerNullEpochCall) {
    this._call = call;
  }
}
