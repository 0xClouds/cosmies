//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;
import {Script} from "forge-std/Script.sol";
import {StatGenerator} from "../src/StatGenerator.sol";

contract DeployStatGenerator is Script {
    uint256 subscriptionId =
        27457044073430278237271457520028609344464237295826812938633977944178628303130;
    address coordinatorAddress = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
    bytes32 keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;

    function run() external {
        vm.startBroadcast();
        new StatGenerator(subscriptionId, coordinatorAddress, keyHash);
        vm.stopBroadcast();
    }
}
