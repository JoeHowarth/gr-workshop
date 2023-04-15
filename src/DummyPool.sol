// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IWormholeReceiver} from "./interfaces/IWormholeReceiver.sol";
import "./libraries/BytesLib.sol";

contract Counter is IWormholeReceiver {
    using BytesLib for bytes;

    uint256 public number;

    address immutable wormhole;
    address immutable wormholeRelayer;
    uint16 immutable chainId;

    constructor(address _wormhole, address _wormholeRelayer, uint16 _chainId) {
        wormhole = _wormhole;
        wormholeRelayer = _wormholeRelayer;
        chainId = _chainId;
    }

    function receiveWormholeMessages(DeliveryData memory deliveryData, bytes[] memory signedVaas) external payable {
        // todo: check emitter addresses
    }

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
