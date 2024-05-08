//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;
import {Script} from "forge-std/Script.sol";
import {StatGenerator} from "../src/StatGenerator.sol";
import {console} from "forge-std/console.sol";

contract RequestRandomNumber is Script {
    StatGenerator statGen =
        StatGenerator(0x37614fa040aF4D6508b4Bf3ba471ACF65a7940fe);

    function run() public {
        vm.startBroadcast();
        statGen.requestRandomWords();
        vm.stopBroadcast();
    }
}
