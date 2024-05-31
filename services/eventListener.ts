import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import StatGeneratorAbi from "../data/abis/StatGeneratorAbi.json";

type EthereumAddress = `0x${string}`;

class EventListener {
  private client;
  private unwatch: Function;

  constructor(contractAddress: EthereumAddress) {
    this.client = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    this.unwatch = this.client.watchContractEvent({
      address: contractAddress,
      abi: StatGeneratorAbi,
      onLogs: this.handleLogs.bind(this),
    });
  }

  private handleLogs(logs: any) {
    console.log(logs);

    let log = logs[0];

    // if (log.eventName === "RequestFullfilled") {
    //   const randomWords = logs[0].args.randomWords;
    //   let tempArr: number[] = [];
    //   try {
    //     for (let word of randomWords) {
    //       let num = parseInt(word);
    //       tempArr.push(num);
    //     }
    //     const data = {
    //       eventName: log.eventName,
    //       randomWords: tempArr,
    //       address: log.address,
    //       blockNumber: log.blockNumber.toString(),
    //       blockHash: log.blockHash,
    //     };
    //     // fs.writeFile("./events.txt", JSON.stringify(data), (err) => {
    //     //   if (err) console.error("file write error:", err);
    //     // });
    //   } catch (e) {
    //     console.error("processing error:", e);
    //   }
    // }
  }
}

export default EventListener;
