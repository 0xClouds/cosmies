// @ts-nocheck
const { createPublicClient, http } = require("viem");
const { sepolia } = require("viem/chains");
const StatGeneratorAbi = require("./abis/StatGenerator.json");
const fs = require("fs");
const { eventNames } = require("process");

const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const unwatch = client.watchContractEvent({
  address: "0x37614fa040aF4D6508b4Bf3ba471ACF65a7940fe",
  abi: StatGeneratorAbi,
  onLogs: (logs) => {
    console.log(logs);

    let log = logs[0];

    if (log.eventName === "RequestFullfilled") {
      const randomWords = logs[0].args.randomWords;
      let tempArr = [];
      try {
        for (word of randomWords) {
          let num = parseInt(word);
          tempArr.push(num);
        }
        const data = {
          eventName: log.eventName,
          randomWords: tempArr,
          address: log.address,
          blockNumber: log.blockNumber.toString(),
          blockHash: log.blockHash,
        };
        fs.writeFile("./events.txt", JSON.stringify(data), () => {});
      } catch (e) {
        console.error("file write error:", e);
      }
    }
  },
});

console.log(unwatch);
