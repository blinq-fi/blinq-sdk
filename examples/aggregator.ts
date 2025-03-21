import 'dotenv/config'
import {
  AggregatorClient,
  type XploreRequest
} from "blinq-sdk";

const request: XploreRequest = {
  inputToken: {
    chainId: "8453",
    address: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
  },
  outputToken: { 
    chainId: "10", 
    address: "0x0000000000000000000000000000000000000000"
  },
  amountIn: "10000",
  amountOutMin: "0",
  recipientAddress: "0x4D7a3035228eF49ED94Aaf53afe405036C33BE24",
  exactOut: false,
  generateDepositAddress: true,
  senderAddress: "0x4D7a3035228eF49ED94Aaf53afe405036C33BE24",
  slippageTolerancePercent: 0,
  timeoutMs: 10000
};

const RPC_SERVER = process.env.RPC_SERVER || "localhost:50051";

const client = new AggregatorClient({
  endpoint: RPC_SERVER,
  timeoutS: 10
});

const aggregateCall = async () => {
  try {
    const route = await client.aggregateCall(request);
    console.log("Best route:", JSON.stringify(route));
  } catch (error) {
    console.error("Failed to get route:", error);
  }
}

const getTransactionRecord = async () => {
  try {
    const rec = await client.getTransactionRecord("TX_HASH");
    console.log("txn rec:", JSON.stringify(rec));
  } catch (error) {
    console.error("Failed to get transaction rec ", error);
  }
}

(async () => {
  await aggregateCall();
  await getTransactionRecord();
})();
