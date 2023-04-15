import * as ethers from "ethers";
import { Counter__factory } from "./ethers-contracts";
import { Wallet } from "ethers";
import { loadConfig } from "./utils";

async function main() {
  const { chains } = loadConfig();
  const wallet = new Wallet(process.env.EVM_PRIVATE_KEY!);

  const addresses = [] as string[];
  // deploy contract on all chains
  for (const chain of chains) {
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
    addresses.push(contract.address);
  }

  // cross register all contracts
  for (let i = 0; i < chains.length; i++) {
    const counter = Counter__factory.connect(addresses[i], wallet);
    for (let j = 0; j < chains.length; j++) {
      if (i == j) {
        continue;
      }
      const tx = await counter.registerContract(
        addresses[j],
        chains[j].chainId
      );
      await tx.wait();
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
