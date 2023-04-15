import * as ethers from "ethers";
import { Counter__factory } from "./ethers-contracts";
import { Wallet } from "ethers";
import {
  DeployedAddresses,
  loadConfig,
  loadWallet,
  storeDeployedAddresses,
} from "./utils";
import { writeFileSync } from "fs";
import { tryNativeToHexString } from "@certusone/wormhole-sdk";

async function main() {
  const { chains } = loadConfig();
  const deployed: DeployedAddresses = { counter: [] };

  // deploy contract on all chains
  for (const chain of chains) {
    console.log(`Deploying chain ${chain.chainId}`);
    const wallet = loadWallet(chain.chainId);
    const tx = await new ethers.ContractFactory(
      Counter__factory.createInterface(),
      Counter__factory.bytecode,
      wallet
    ).deploy(
      chain.wormholeAddress,
      chain.wormholeRelayerAddress,
      chain.chainId
    );
    const contract = await tx.deployed();
    deployed.counter.push({
      address: contract.address,
      chainId: chain.chainId,
    });
  }

  console.log("Deployed addresses: ", deployed);

  // cross register all contracts
  for (let i = 0; i < chains.length; i++) {
    const wallet = loadWallet(chains[i].chainId);
    const counter = Counter__factory.connect(
      deployed.counter[i].address,
      wallet
    );

    // console.log(await counter.thisInWormholeFormat());
    for (let j = 0; j < chains.length; j++) {
      if (i == j) {
        continue;
      }

      const isEqual = await counter.isEqual(
        deployed.counter[j].chainId,
        "0x" + tryNativeToHexString(deployed.counter[j].address, "ethereum"),
        { value: ethers.BigNumber.from(10).pow(18), gasLimit: 300_000 }
      );
      console.log("isEqual: ", isEqual);

      console.log(
        `Registering chain ${chains[j].chainId} with ${chains[i].chainId}`
      );
      const tx = await counter.registerContract(
        deployed.counter[j].address,
        chains[j].chainId
      );
      const rx = await tx.wait();
      console.log("txHash: ", rx.transactionHash);
    }
  }

  // write addresses
  storeDeployedAddresses(deployed);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
