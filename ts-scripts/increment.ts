import * as ethers from "ethers";
import { Counter__factory } from "./ethers-contracts";
import { Wallet } from "ethers";
import { loadConfig } from "./utils";

async function main() {
  const { chains } = loadConfig();
  const wallet = new Wallet(process.env.EVM_PRIVATE_KEY!);

  const from = process.argv.find(arg)

}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

function getArg<T>(pattern: string, isFlag = false, required = true): T {
  let idx = process.argv.findIndex(x => x === pattern)
  if (idx === -1) {
    return undefined
  }
}