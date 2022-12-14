import {
  Farm,
  Market,
  Epoch,
  EpochVault,
  EpochIdMapping,
  Vault,
  Token
} from "./entities/schema";
import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  EpochCreated,
  MarketCreated
} from "./entities/VaultFactory/VaultFactory";
import { DepegInsurance } from "./entities/Controller/Controller";
import { CreatedStakingReward } from "./entities/RewardsFactory/RewardsFactory";
import {
  Vault as VaultTemplate,
  StakingRewards as FarmTemplate
} from "./entities/templates";

export function handleMarketCreated(event: MarketCreated): void {
  const params = event.params;
  let id = params.mIndex.toString();

  let market = Market.load(id);

  if (market != null) {
    log.debug("Duplicate Market {}", [id]);
    return;
  } else {
    market = new Market(id);
  }

  let hedgeVault = new Vault(params.hedge.toHexString()) as Vault;
  hedgeVault.address = params.hedge;
  hedgeVault.name = params.name.toString() + "hDEPEG";
  hedgeVault.marketIndex = params.mIndex.toString();
  hedgeVault.tokenAdress = params.token;
  hedgeVault.marketName = params.name;
  hedgeVault.strikePrice = params.strikePrice;
  hedgeVault.formattedStrikePrice =
    "0." +
    params.name
      .toString()
      .split("_")[1]
      .split("*")[0];
  hedgeVault.type = "hedge";

  hedgeVault.save();

  let riskVault = new Vault(params.risk.toHexString()) as Vault;
  riskVault.address = params.risk;
  riskVault.name = params.name.toString() + "rDEPEG";
  riskVault.marketIndex = params.mIndex.toString();
  riskVault.tokenAdress = params.token;
  riskVault.marketName = params.name;
  riskVault.strikePrice = params.strikePrice;
  riskVault.formattedStrikePrice =
    "0." +
    params.name
      .toString()
      .split("_")[1]
      .split("*")[0];
  riskVault.type = "risk";

  riskVault.save();

  market.marketIndex = params.mIndex.toString();
  market.token = params.token;
  market.marketName = params.name;
  market.strikePrice = params.strikePrice;
  market.formattedStrikePrice =
    "0." +
    params.name
      .toString()
      .split("_")[1]
      .split("*")[0];
  market.hedgeVault = params.hedge;
  market.riskVault = params.risk;
  market.save();

  let token = Token.load(params.token.toHexString());
  if (!token) {
    token = new Token(params.token.toHexString());
    token.address = params.token;
    token.name = params.name
      .toString()
      .substring(3)
      .split("_")[0];
    token.save();
  }
  VaultTemplate.create(params.risk);
  VaultTemplate.create(params.hedge);
}

export function handleEpochCreated(event: EpochCreated): void {
  const params = event.params;
  let id = params.marketEpochId.toHexString();

  let epoch = Epoch.load(id);

  if (epoch != null) {
    log.debug("Duplicate Epoch {}", [id]);
    return;
  } else {
    epoch = new Epoch(id);
  }

  let epochMappingId = `${params.mIndex.toString()}${params.endEpoch.toString()}`;
  let epochMapping = new EpochIdMapping(epochMappingId);
  epochMapping.epochId = id;

  epoch.marketIndex = params.mIndex.toString();
  epoch.hedgeVault = params.hedge;
  epoch.riskVault = params.risk;
  epoch.token = params.token;
  epoch.marketName = params.name;
  epoch.strikePrice = params.strikePrice;
  epoch.formattedStrikePrice =
    "0." +
    params.name
      .toString()
      .split("_")[1]
      .split("*")[0];
  epoch.startEpoch = params.startEpoch.toI32();
  epoch.endEpoch = params.endEpoch.toI32();
  epoch.isDeppeged = false;
  epoch.epochEnded = false;
  epoch.withdrawalFee = params.withdrawalFee.toI32();
  epoch.save();
  epochMapping.save();
}

export function handleDepegInsurance(event: DepegInsurance): void {
  const params = event.params;
  let id = params.epochMarketID.toHexString();

  let epoch = Epoch.load(id);

  if (epoch) {
    epoch.epochEnded = true;
    epoch.depegPrice = params.depegPrice;
    epoch.isDeppeged = params.isDisaster;
    epoch.triggredAt = params.time;

    epoch.RISK_claimTVL = params.tvl.RISK_claimTVL;
    epoch.RISK_finalTVL = params.tvl.RISK_finalTVL;
    epoch.INSR_claimTVL = params.tvl.INSR_claimTVL;
    epoch.INSR_finalTVL = params.tvl.INSR_finalTVL;
    epoch.save();
  }
}

export function handleCreatedStakingReward(event: CreatedStakingReward): void {
  const params = event.params;
  let id = params.marketEpochId.toHexString();
  let epoch = Epoch.load(id);

  if (!epoch) return;

  let hedgeFarm = Farm.load(params.hedgeFarm.toHexString());
  if (hedgeFarm != null) {
    log.debug("Duplicate Farm {}", [id]);
    return;
  } else {
    hedgeFarm = new Farm(params.hedgeFarm.toHexString());
  }
  hedgeFarm.marketIndex = params.mIndex.toString();
  hedgeFarm.address = params.hedgeFarm;
  hedgeFarm.pair = params.riskFarm;
  hedgeFarm.token = epoch.token;
  hedgeFarm.marketName = epoch.marketName;
  hedgeFarm.epochId = id;
  hedgeFarm.balance = new BigInt(0);
  hedgeFarm.type = "hedge";
  hedgeFarm.endEpoch = epoch.endEpoch;
  hedgeFarm.startEpoch = epoch.startEpoch;
  hedgeFarm.vaultAddress = epoch.hedgeVault;
  hedgeFarm.strikePrice = epoch.strikePrice;
  hedgeFarm.formattedStrikePrice = epoch.formattedStrikePrice;

  let riskFarm = Farm.load(params.riskFarm.toHexString());
  if (riskFarm != null) {
    log.debug("Duplicate Farm {}", [id]);
    return;
  } else {
    riskFarm = new Farm(params.riskFarm.toHexString());
  }

  riskFarm.marketIndex = params.mIndex.toString();
  riskFarm.address = params.riskFarm;
  riskFarm.pair = params.hedgeFarm;
  riskFarm.token = epoch.token;
  riskFarm.marketName = epoch.marketName;
  riskFarm.epochId = id;
  riskFarm.balance = new BigInt(0);
  riskFarm.type = "risk";
  riskFarm.endEpoch = epoch.endEpoch;
  riskFarm.startEpoch = epoch.startEpoch;
  riskFarm.vaultAddress = epoch.riskVault;
  riskFarm.strikePrice = epoch.strikePrice;
  riskFarm.formattedStrikePrice = epoch.formattedStrikePrice;

  riskFarm.save();
  hedgeFarm.save();
  FarmTemplate.create(params.hedgeFarm);
  FarmTemplate.create(params.riskFarm);
}