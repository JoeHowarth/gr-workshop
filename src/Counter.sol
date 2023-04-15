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
    // bytes32 public immutable thisInWormholeFormat;

    uint16[] public registeredChains;
    mapping(uint16 => bytes32) public registeredChainToAddress;

    constructor(address _wormhole, address _wormholeRelayer, uint16 _chainId) {
        wormhole = _wormhole;
        wormholeRelayer = _wormholeRelayer;
        chainId = _chainId;
        owner = msg.sender;
        // thisInWormholeFormat = IWormholeRelayer(_wormholeRelayer).toWormholeFormat(address(this));
    }

    function getNumber() external view returns (uint256) {
        return number;
    }

    function increment() public payable {
        number++;
        IWormholeRelayer.VaaKey[] memory keys = new IWormholeRelayer.VaaKey[](0);
        for (uint256 i = 0; i < registeredChains.length; i++) {
            uint16 targetChain = registeredChains[i];
            bytes32 targetAddress = registeredChainToAddress[targetChain];
            // Broadcast the increment to all registered contracts
            IWormholeRelayer(wormholeRelayer).send{value: msg.value}(
                // targetChain
                targetChain,
                // targetAddress
                targetAddress,
                // refundChain
                targetChain,
                // refundAddress
                // IWormholeRelayer(wormholeRelayer).toWormholeFormat(msg.sender),
                targetAddress,
                // maxTransactionFee - aka how to spend buying gas on the target chain
                msg.value, // todo: improve this
                // receiverValue - aka how much to spend buying target chain native currency
                0,
                // payload
                abi.encode(number),
                keys,
                200
            );
        }
    }

    function isEqual(uint16 _chainId, bytes32 _targetAddress) public view returns (bool) { 
        return _chainId == registeredChains[0] && registeredChainToAddress[_chainId] == _targetAddress;
    }

    function literalSend(uint16 _chainId, bytes32 _targetAddress) public payable {
        number++;
        IWormholeRelayer.VaaKey[] memory keys = new IWormholeRelayer.VaaKey[](0);
        IWormholeRelayer(wormholeRelayer).send{value: msg.value}(
            _chainId,
            _targetAddress,
            _chainId,
            _targetAddress,
            msg.value, // todo: improve this
            0,
            abi.encode(number),
            keys,
            200
        );
    }

    function registerContract(address _addr, uint16 _chainId) external onlyOwner {
        registeredChains.push(_chainId);
        registeredChainToAddress[_chainId] = IWormholeRelayer(wormholeRelayer).toWormholeFormat(_addr);
    }

    function receiveWormholeMessages(DeliveryData memory _deliveryData, bytes[] memory) external payable {
        // require(
        //     registeredChainToAddress[_deliveryData.sourceChain] == _deliveryData.sourceAddress,
        //     "Unregistered sending contract"
        // );
        number++;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "caller not the owner");
        _;
    }
}
