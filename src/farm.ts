import { BigInt } from "@graphprotocol/graph-ts";
import { EpochVault, Farm, FarmPosition } from "./entities/schema";
import {
  Staked,
  Withdrawn
} from "./entities/templates/StakingRewards/StakingRewards";

export function handleFarmDeposit(event: Staked): void {
  let farm = Farm.load(event.address.toHexString());
  if (!farm) return;
  farm.balance = farm.balance.plus(event.params.amount);
  farm.save();

  let farmPositionId = `${farm.id}${event.params.user.toHexString()}`;
  let farmPosition = FarmPosition.load(farmPositionId);
  if (!farmPosition) {
    farmPosition = new FarmPosition(farmPositionId);
    farmPosition.balance = event.params.amount;
    farmPosition.user = event.params.user;
    farmPosition.token = farm.token;
    farmPosition.marketName = farm.marketName;
    farmPosition.marketIndex = farm.marketIndex;
    farmPosition.epochId = farm.epochId;
    farmPosition.type = farm.type;
    farmPosition.pair = farm.pair;
    farmPosition.farmId = event.address.toHexString();
    farmPosition.endEpoch = farm.endEpoch;
    farmPosition.startEpoch = farm.startEpoch;
    farmPosition.strikePrice = farm.strikePrice;
    farmPosition.formattedStrikePrice = farm.formattedStrikePrice;
    let epochVaultId =
      farm.epochId.substring(0, 8) +
      farm.type +
      event.params.user.toHexString();
    let vault = EpochVault.load(epochVaultId);
    if (vault) {
      vault.isFarming = true;
      vault.farmId = event.address.toHexString();
      vault.save();
    }
  } else {
    farmPosition.balance = farmPosition.balance.plus(event.params.amount);
  }
  farmPosition.save();
}

export function handleFarmWithdraw(event: Withdrawn): void {
  let farm = Farm.load(event.address.toHexString());
  if (!farm) return;
  farm.balance = farm.balance.minus(event.params.amount);
  let farmPositionId = `${farm.id}${event.params.user.toHexString()}`;
  let farmPosition = FarmPosition.load(farmPositionId);
  if (!farmPosition) return;
  if (farmPosition.balance) {
    farmPosition.balance = farmPosition.balance.minus(event.params.amount);
    let epochVaultId =
      farm.epochId.substring(0, 8) +
      farm.type +
      event.params.user.toHexString();
    let vault = EpochVault.load(epochVaultId);
    if (vault) {
      vault.isFarming = farmPosition.balance.gt(BigInt.zero()) ? true : false;
      vault.save();
    }
    farmPosition.save();
  }
  farm.save();
}
