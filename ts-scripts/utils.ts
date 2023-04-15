import { readFileSync } from "fs";

export interface Config {
  chains: {
    description: string;
    chainId: number;
    rpc: string;
    wormholeRelayerAddress: string;
    wormholeAddress: string;
  }[];
}

export function loadConfig(): Config {
  return JSON.parse(
    readFileSync("ts-scripts/config.json", { encoding: "utf-8" })
  );
}
