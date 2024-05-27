//SPDX-License-Identifer:MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {COSMIES721} from "../src/COSMIES721.sol";

contract TestCosmiesERC721 is Test{ 
 COSMIES721 CosmiesContract;
 address owner = makeAddr("cloud");
 address player = makeAddr('player1');

function setUp() public {
    startHoax(owner, 10 ether);
    CosmiesContract = new COSMIES721();
    vm.stopPrank();
    startHoax(player, 10 ether);
    CosmiesContract.safeMint{value: 0.05 ether}();
}
function testFail_Burning_NoApproval() public {
    //Stop Player hoax temporarily because no prior calls are made;
    vm.stopPrank();

    assertEq(
        CosmiesContract.balanceOf(player), 1
    );
    vm.startPrank(owner);
    CosmiesContract.burn(0);
    assertEq(CosmiesContract.balanceOf(player), 0);
    vm.stopPrank();
}

function testFail_Burning_NotOwner() public {
    assertEq(CosmiesContract.balanceOf(player),1);
    CosmiesContract.burn(0);
}

function test_Burning() public {
    CosmiesContract.setApprovalForAll(owner, true);
    vm.startPrank(owner);
    CosmiesContract.burn(0);
    vm.stopPrank();
}

}

