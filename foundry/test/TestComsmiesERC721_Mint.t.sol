//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {COSMIES721} from "../src/COSMIES721.sol";

contract CosmiesERC721Test_Mint is Test{
 COSMIES721 CosmiesContract;
 address owner = makeAddr("cloud");

function setUp() public {
    startHoax(owner, 10 ether);
    CosmiesContract = new COSMIES721();
}

function testMint() public {
    uint prevBalance = CosmiesContract.balanceOf(owner);
    assertEq(prevBalance, 0);
    CosmiesContract.safeMint{value: 0.05 ether}();
    uint postBalance = CosmiesContract.balanceOf(owner);
    assertEq(postBalance, 1);
}

function testFail_notEnoughValue_Mint(uint96 amount) public {
    vm.assume(amount > 0.05 ether);
    CosmiesContract.safeMint();
}

function testFail_MaxAmountOfCosmies_Mint()public{
    for(uint i = 0; i <= 10; i++){
        CosmiesContract.safeMint();
    }
}

function test_withdraw() public {
    vm.stopPrank();

    startHoax(address(69));
    for(uint i = 0;  i < 10; i++){ 
        CosmiesContract.safeMint{value: 0.05 ether}();
    }
    vm.stopPrank();

    vm.startPrank(owner);
    uint expectedBalance = owner.balance + (0.05 * 10 ether);
    CosmiesContract.withdraw();
    assertEq(expectedBalance, owner.balance);
    vm.stopPrank();
}

function testFail_Withdraw_notOwner() public{ 
        vm.stopPrank();

    startHoax(address(69));
    for(uint i = 0;  i < 10; i++){ 
        CosmiesContract.safeMint{value: 0.05 ether}();
    }
    CosmiesContract.withdraw();
    vm.stopPrank();
}
}