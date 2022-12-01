import { Epoch, EpochVault, EpochIdMapping, Vault, Farm } from "./entities/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { TransferSingle} from "./entities/templates/Vault/Vault";

export function handleTransfer(event: TransferSingle): void {

    let vault = Vault.load(event.address.toHexString());
    if (!vault) return;
    let epochMappingId = `${vault.marketIndex}${event.params.id.toString()}`;
    let eMapp = EpochIdMapping.load(epochMappingId);
    if (eMapp) {
      let epochId = eMapp.epochId;
      let from = event.params.from;
      let to = event.params.to;
      let value = event.params.value;
      let address = event.address;
      let type = vault.type;

      let fromIsFarm = Farm.load(from.toHexString())
      let toIsFarm = Farm.load(to.toHexString())

      if(fromIsFarm != null ||  toIsFarm != null) {
        return
      }

      if(from !== Address.zero()){
        _withdraw(epochId, type, from, value, false);
      }
      if(to !== Address.zero()){
        _deposit(epochId, type, to, value, address);
      }
      
    }
}

function _deposit(
    epochId: string,
    type: string,
    user: Address,
    amount: BigInt,
    address: Address
  ): void {
    let epoch = Epoch.load(epochId);
    if (epoch) {
      let epochVaultId =
        epochId.substring(0, 8) +
        type +
        user.toHexString();
      let epochVault = EpochVault.load(epochVaultId);
      if (epochVault != null) {
        const balance = epochVault.balance;
        if (balance) {
          epochVault.balance = balance.plus(amount);
        }
      } else {
        epochVault = new EpochVault(epochVaultId);
        epochVault.address = address;
        epochVault.user = user;
        epochVault.balance = amount;
        epochVault.isOngoing = !epoch.epochEnded;
        epochVault.isResolved = epoch.epochEnded;
        epochVault.epochId = epochId;
        epochVault.name = epoch.marketName;
        epochVault.marketIndex = epoch.marketIndex;
        epochVault.tokenAdress = epoch.token;
        epochVault.strikePrice = epoch.strikePrice;
        epochVault.formattedStrikePrice = epoch.formattedStrikePrice;
        epochVault.type = type;
        epochVault.marketName = epoch.marketName;
        epochVault.claimed = false;
        epochVault.endEpoch = epoch.endEpoch;
        epochVault.startEpoch = epoch.startEpoch;
      }
      epochVault.save();
    }
  }
  
  function _withdraw(
    epochId: string,
    type: string,
    user: Address,
    amount: BigInt,
    claim: boolean
  ): void {
    let epoch = Epoch.load(epochId);
  
    if (epoch) {
      let epochVaultId = epochId.substring(0, 8) + type + user.toHexString();
      let epochVault = EpochVault.load(epochVaultId);
  
      if (epochVault !== null) {
        const balance = epochVault.balance;
        if (balance) {
          const newBalance = balance.minus(amount);
          epochVault.balance = newBalance;
          if (claim) {
            const z = BigInt.fromI32(0);
            epochVault.claimed = !newBalance.gt(z);
          }
          epochVault.save();
        }
      }
    }
  }


// export function handleDeposit(event: Deposit): void {
//     let vault = Vault.load(event.address.toHexString());
//     if (!vault) return;
//     let epochMappingId = `${vault.marketIndex}${event.params.id.toString()}`;
//     let eMapp = EpochIdMapping.load(epochMappingId);
//     if (eMapp) {
//       let epochId = eMapp.epochId;
//       let epoch = Epoch.load(epochId);
//       if (epoch) {
//         let epochVaultId =
//           epochId.substring(0, 8) +
//           vault.type +
//           event.params.caller.toHexString();
//         let epochVault = EpochVault.load(epochVaultId);
//         if (epochVault != null) {
//           const balance = epochVault.balance;
//           if (balance) {
//             epochVault.balance = balance.plus(event.params.assets);
//           }
//         } else {
//           epochVault = new EpochVault(epochVaultId);
//           epochVault.address = event.address;
//           epochVault.user = event.params.caller;
//           epochVault.balance = event.params.assets;
//           epochVault.isOngoing = !epoch.epochEnded;
//           epochVault.isResolved = epoch.epochEnded;
//           epochVault.epochId = epochId;
//           epochVault.name = epoch.marketName;
//           epochVault.marketIndex = epoch.marketIndex;
//           epochVault.tokenAdress = epoch.token;
//           epochVault.strikePrice = epoch.strikePrice;
//           epochVault.formattedStrikePrice = epoch.formattedStrikePrice;
//           epochVault.type = vault.type;
//           epochVault.marketName = epoch.marketName;
//           epochVault.claimed = false;
//           epochVault.endEpoch = epoch.endEpoch;
//           epochVault.startEpoch = epoch.startEpoch;
//         }
//         epochVault.save();
//       }
//     }
//   }

//   export function handleWithdraw(event: Withdraw): void {
//     let vault = Vault.load(event.address.toHexString());
//     if (!vault) return;
//     let epochMappingId = `${vault.marketIndex}${event.params.id.toString()}`;
//     let eMapp = EpochIdMapping.load(epochMappingId);
//     if (eMapp) {
//       let epochId = eMapp.epochId;
//       let epoch = Epoch.load(epochId);
//       if (epoch) {
//         let epochVaultId =
//           epochId.substring(0, 8) +
//           vault.type +
//           event.params.caller.toHexString();
//         let epochVault = EpochVault.load(epochVaultId);
//         if (epochVault !== null) {
//           const balance = epochVault.balance;
//           if (balance) {
//             const newBalance = balance.minus(event.params.assets);
//             epochVault.balance = newBalance;
//             const z = BigInt.fromI32(0);
//             epochVault.claimed = !newBalance.gt(z);
//             epochVault.save();
//           }
//         }
//       }
//     }
//   }