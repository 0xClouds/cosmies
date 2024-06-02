import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import StatGeneratorAbi from "../data/abis/StatGeneratorAbi.json";

type EthereumAddress = `0x${string}`;

class EventListener {
  private client;
  private unwatch: Function;
  private resolve!: Function;
  private promise: Promise<any>;

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

    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  private handleLogs(logs: any) {
    let log = logs[0];
    if (log.eventName === "RequestFullfilled") {
      const randomWords = logs[0].args.randomWords;
      let tempArr: number[] = [];
      try {
        for (let word of randomWords) {
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

        this.resolve(data);
        this.unwatch();
      } catch (e) {
        console.error("processing error:", e);
      }
    }
  }

  public getEventPromise() {
    return this.promise;
  }
}

export default EventListener;
