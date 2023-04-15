// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IWormholeReceiver} from "./interfaces/IWormholeReceiver.sol";
import {IWormholeRelayer} from "./interfaces/IWormholeRelayer.sol";
import "./libraries/BytesLib.sol";

// distributed counter
contract Counter is IWormholeReceiver {
    using BytesLib for bytes;

    uint256 public number;

    address public immutable owner;
    address public immutable wormhole;
    address public immutable wormholeRelayer;
    uint16 public immutable chainId;

    uint16[] public registeredChains;
    mapping(uint16 => bytes32) public registeredChainToAddress;

    constructor(address _wormhole, address _wormholeRelayer, uint16 _chainId) {
        wormhole = _wormhole;
        wormholeRelayer = _wormholeRelayer;
        chainId = _chainId;
        owner = msg.sender;
    }

    function getNumber() external view returns (uint256) {
        return number;
    }

    function isEqual(uint16 _chainId, bytes32 _targetAddress) public view returns (bool) {
        return _chainId == registeredChains[0] && registeredChainToAddress[_chainId] == _targetAddress;
    }

    function increment() public payable {
        number++;

        uint256 sent = 0;
        uint256 cost = 1e17;
        for (uint256 i = 0; i < registeredChains.length; i++) {
            uint16 _chainId = registeredChains[i];
            bytes32 _targetAddress = registeredChainToAddress[_chainId];

            IWormholeRelayer.VaaKey[] memory keys = new IWormholeRelayer.VaaKey[](0);
            IWormholeRelayer(wormholeRelayer).send{value: cost}(
                _chainId,
                _targetAddress,
                _chainId,
                _targetAddress,
                cost, // todo: improve this
                0,
                abi.encode(number),
                keys,
                200
            );
            sent += cost;
        }
        if (msg.value - sent > 0) {
            (bool success,) = msg.sender.call{value: msg.value - sent}("");
            require(success, "didn't succeed refunding caller");
        }
    }

    function registerContract(address _addr, uint16 _chainId) external onlyOwner {
        registeredChains.push(_chainId);
        registeredChainToAddress[_chainId] = IWormholeRelayer(wormholeRelayer).toWormholeFormat(_addr);
    }

    function receiveWormholeMessages(DeliveryData memory _deliveryData, bytes[] memory) external payable {
        require(
            registeredChainToAddress[_deliveryData.sourceChain] == _deliveryData.sourceAddress,
            "Unregistered sending contract"
        );
        number++;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "caller not the owner");
        _;
    }
}
