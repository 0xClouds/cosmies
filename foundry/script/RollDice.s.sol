//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Dice} from "../src/Dice.sol";
import {console} from "forge-std/console.sol";


contract RollDice is Script {
    Dice diceContract = Dice(0xae09B4E44b58ca1549642A4289Dbd0c4fa36e6F8);
    function run () external {
        vm.startBroadcast();
        diceContract.requestRandomWords();
        vm.stopBroadcast();
    }

}