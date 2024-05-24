//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {COSMIES721} from "../src/COSMIES721.sol";

contract CosmiesERC721Test is Test{
 COSMIES721 CosmiesContract;
 address owner = makeAddr("cloud");
    function setUp() public {
        startHoax(owner, 1 ether);
        CosmiesContract = new COSMIES721();
        CosmiesContract.safeMint{value: 0.05 ether}(msg.sender);
    }

    function test_BaseURI() public {
        CosmiesContract.setBaseURI("http://www.test.com/");
        assertEq(CosmiesContract.tokenURI(0), "http://www.test.com/0");
    }

    function testFail_BaseURI_notOwner()public{
        vm.startPrank(address(69));
        CosmiesContract.setBaseURI("http://www.test.com/");
        vm.stopPrank();
    }

    function test_withdraw() public {
        uint256 pastBalance = address(owner).balance;
        CosmiesContract.withdraw();
        assertEq(address(owner).balance, pastBalance + 0.05 ether);
    }
    


  
}