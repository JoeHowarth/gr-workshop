import * as ethers from "ethers";
import { Counter__factory } from "./ethers-contracts";
import { Wallet } from "ethers";
import {
  checkFlag,
  getArg,
  loadConfig as getConfig,
  loadDeployedAddresses as getDeployedAddresses,
  loadWallet as getWallet,
} from "./utils";
import { tryNativeToHexString } from "@certusone/wormhole-sdk";

async function main() {
  if (checkFlag("increment")) {
    await increment();
    return;
  }
  if (checkFlag("registered")) {
    await registered();
  }
  if (checkFlag("testSend")) {
    const deployed = getDeployedAddresses().counter.find(
      (c) => c.chainId === 6
    )!;
    const counter = Counter__factory.connect(
      deployed.address,
      getWallet(deployed.chainId)
    );
    await counter
      .testSend({ value: ethers.BigNumber.from(10).pow(18), gasLimit: 300_000 })
      .then((x) => x.wait());
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
  const tx_0 = await counters[chainId]
    .literalSend(
      14,
      "0x" + tryNativeToHexString(counters[14].address, "ethereum"),

      {
        value: ethers.BigNumber.from(10).pow(18),
        gasLimit: 300_000,
      }
    )
    .then((x) => x.wait());
  console.log(tx_0.transactionHash);
  // const tx = await counters[chainId]["increment()"]({
  //   value: ethers.BigNumber.from(10).pow(18).mul(2),
  //   gasLimit: 300_000,
  // });

  // read state and poll for 10s
  await read("After Increment State: ");
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await read("1s State: ");
  }
}

async function registered() {
  for (const deployed of getDeployedAddresses().counter) {
    const counter = Counter__factory.connect(
      deployed.address,
      getWallet(deployed.chainId)
    );
    const indices = getConfig()
      .chains.map((c, i) => i)
      .slice(0, -1);
    const registeredChains = await Promise.all(
      indices.map((idx) => counter.registeredChains(idx))
    );
    console.log(`On chain: ${deployed.chainId}`);
    console.log(registeredChains);
    const addresses = await Promise.all(
      registeredChains.map((c) => counter.registeredChainToAddress(c))
    );
    console.log(addresses.map((a) => a));
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
