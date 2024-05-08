//SPDX-License-Identifier:MIT
pragma solidity ^0.8.20;
import {IVRFCoordinatorV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

/**
 * @title Cosmies Stat Generator
 * @author Clouds
 * @notice Generate stats for each Cosmie at mint time. Leveraging Chainlink VRF we generate random stats within the specified paramters of each Cosmie.
 */

contract StatGenerator is VRFConsumerBaseV2Plus {
    event RequestSubmitted(uint256 requestId, uint256 numWords);
    event RequestFullfilled(uint256 requestId, uint256[] randomWords);
    //Subscription ID from chainlink subscription service
    uint256 s_subscriptionId;
    //Maxium gas price
    bytes32 keyHash;
    //Maxium units of gas
    uint32 callbackGasLimit = 1000000;
    uint16 requestConfirmations = 3;
    // Total number of requested random numbers
    uint32 numWords = 5;
    IVRFCoordinatorV2Plus COORDINATOR;

    // a request struct
    struct RequestStatus {
        bool fulfilled;
        bool exists;
        uint256[] randomWords;
    }

    uint256[] public requestIds;
    uint256 public lastRequestId;

    //store our request..
    mapping(uint256 requestId => RequestStatus) public s_request;

    constructor(
        uint256 _subscriptionId,
        address _coordinatorAddress,
        bytes32 _keyHash
    ) VRFConsumerBaseV2Plus(_coordinatorAddress) {
        s_subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        COORDINATOR = IVRFCoordinatorV2Plus(_coordinatorAddress);
    }

    function requestRandomWords()
        external
        onlyOwner
        returns (uint256 requestId)
    {
        requestId = COORDINATOR.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );
        s_request[requestId] = RequestStatus({
            randomWords: new uint256[](5),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSubmitted(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_request[_requestId].exists, "request not found");
        for (uint8 i = 0; i < numWords; ) {
            _randomWords[i] = (_randomWords[i] % 20) + 1;
            unchecked {
                i++;
            }
        }
        s_request[_requestId].fulfilled = true;
        s_request[_requestId].randomWords = _randomWords;
        emit RequestFullfilled(_requestId, _randomWords);
    }
}
