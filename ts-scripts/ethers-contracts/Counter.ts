/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace IWormholeReceiver {
  export type DeliveryDataStruct = {
    sourceAddress: PromiseOrValue<BytesLike>;
    sourceChain: PromiseOrValue<BigNumberish>;
    maximumRefund: PromiseOrValue<BigNumberish>;
    deliveryHash: PromiseOrValue<BytesLike>;
    payload: PromiseOrValue<BytesLike>;
  };

  export type DeliveryDataStructOutput = [
    string,
    number,
    BigNumber,
    string,
    string
  ] & {
    sourceAddress: string;
    sourceChain: number;
    maximumRefund: BigNumber;
    deliveryHash: string;
    payload: string;
  };
}

export interface CounterInterface extends utils.Interface {
  functions: {
    "chainId()": FunctionFragment;
    "getNumber()": FunctionFragment;
    "increment()": FunctionFragment;
    "literalSend(uint16,bytes32)": FunctionFragment;
    "number()": FunctionFragment;
    "owner()": FunctionFragment;
    "receiveWormholeMessages((bytes32,uint16,uint256,bytes32,bytes),bytes[])": FunctionFragment;
    "registerContract(address,uint16)": FunctionFragment;
    "registeredChainToAddress(uint16)": FunctionFragment;
    "registeredChains(uint256)": FunctionFragment;
    "testSend()": FunctionFragment;
    "wormhole()": FunctionFragment;
    "wormholeRelayer()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "chainId"
      | "getNumber"
      | "increment"
      | "literalSend"
      | "number"
      | "owner"
      | "receiveWormholeMessages"
      | "registerContract"
      | "registeredChainToAddress"
      | "registeredChains"
      | "testSend"
      | "wormhole"
      | "wormholeRelayer"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(functionFragment: "getNumber", values?: undefined): string;
  encodeFunctionData(functionFragment: "increment", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "literalSend",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "number", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "receiveWormholeMessages",
    values: [IWormholeReceiver.DeliveryDataStruct, PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "registerContract",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredChainToAddress",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredChains",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "testSend", values?: undefined): string;
  encodeFunctionData(functionFragment: "wormhole", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "wormholeRelayer",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getNumber", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "increment", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "literalSend",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "number", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "receiveWormholeMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredChainToAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredChains",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "testSend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wormhole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "wormholeRelayer",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Counter extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CounterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    chainId(overrides?: CallOverrides): Promise<[number]>;

    getNumber(overrides?: CallOverrides): Promise<[BigNumber]>;

    increment(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    literalSend(
      _chainId: PromiseOrValue<BigNumberish>,
      _targetAddress: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    number(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    receiveWormholeMessages(
      _deliveryData: IWormholeReceiver.DeliveryDataStruct,
      arg1: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerContract(
      _addr: PromiseOrValue<string>,
      _chainId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registeredChainToAddress(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    registeredChains(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    testSend(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    wormhole(overrides?: CallOverrides): Promise<[string]>;

    wormholeRelayer(overrides?: CallOverrides): Promise<[string]>;
  };

  chainId(overrides?: CallOverrides): Promise<number>;

  getNumber(overrides?: CallOverrides): Promise<BigNumber>;

  increment(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  literalSend(
    _chainId: PromiseOrValue<BigNumberish>,
    _targetAddress: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  number(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  receiveWormholeMessages(
    _deliveryData: IWormholeReceiver.DeliveryDataStruct,
    arg1: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerContract(
    _addr: PromiseOrValue<string>,
    _chainId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registeredChainToAddress(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  registeredChains(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  testSend(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  wormhole(overrides?: CallOverrides): Promise<string>;

  wormholeRelayer(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    chainId(overrides?: CallOverrides): Promise<number>;

    getNumber(overrides?: CallOverrides): Promise<BigNumber>;

    increment(overrides?: CallOverrides): Promise<void>;

    literalSend(
      _chainId: PromiseOrValue<BigNumberish>,
      _targetAddress: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    number(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    receiveWormholeMessages(
      _deliveryData: IWormholeReceiver.DeliveryDataStruct,
      arg1: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    registerContract(
      _addr: PromiseOrValue<string>,
      _chainId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    registeredChainToAddress(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    registeredChains(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    testSend(overrides?: CallOverrides): Promise<void>;

    wormhole(overrides?: CallOverrides): Promise<string>;

    wormholeRelayer(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    chainId(overrides?: CallOverrides): Promise<BigNumber>;

    getNumber(overrides?: CallOverrides): Promise<BigNumber>;

    increment(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    literalSend(
      _chainId: PromiseOrValue<BigNumberish>,
      _targetAddress: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    number(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    receiveWormholeMessages(
      _deliveryData: IWormholeReceiver.DeliveryDataStruct,
      arg1: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerContract(
      _addr: PromiseOrValue<string>,
      _chainId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registeredChainToAddress(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registeredChains(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    testSend(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    wormhole(overrides?: CallOverrides): Promise<BigNumber>;

    wormholeRelayer(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    increment(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    literalSend(
      _chainId: PromiseOrValue<BigNumberish>,
      _targetAddress: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    number(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    receiveWormholeMessages(
      _deliveryData: IWormholeReceiver.DeliveryDataStruct,
      arg1: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerContract(
      _addr: PromiseOrValue<string>,
      _chainId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registeredChainToAddress(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registeredChains(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    testSend(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    wormhole(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wormholeRelayer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
