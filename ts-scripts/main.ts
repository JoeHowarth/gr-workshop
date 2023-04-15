import * as ethers from "ethers";
import { Counter__factory } from "./ethers-contracts";
import { Wallet } from "ethers";
import {
  getArg,
  loadConfig as getConfig,
  loadDeployedAddresses as getDeployedAddresses,
  loadWallet as getWallet,
} from "./utils";

async function main() {
  if (getArg(["increment"])) {
    await increment();
  }
  await read();
}

async function increment() {
  const chainId = Number(getArg(["--chain", "-c"]));

  await read("Before Increment State: ");
  const counters = Object.fromEntries(
    getDeployedAddresses().counter.map((deployed) => [
      deployed.chainId,
      Counter__factory.connect(deployed.address, getWallet(deployed.chainId)),
    ])
  );
  const tx = await counters[chainId].increment();
  await tx.wait();

  // read state and poll for 10s
  await read("After Increment State: ");
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await read("1s State: ");
  }
}

async function read(s = "State: ") {
  for (const deployed of getDeployedAddresses().counter) {
    const counter = Counter__factory.connect(
      deployed.address,
      getWallet(deployed.chainId)
    );
    const number = await counter.getNumber();
    s += `chain ${deployed.chainId}: ${number} `;
  }
  console.log(s);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
