//SPDX-License-Identifer:MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {COSMIES721} from "../src/COSMIES721.sol";

contract DeployERC721 is Script {
    function run() public {
        vm.startBroadcast();
        new COSMIES721();
        vm.stopBroadcast();
    }
}