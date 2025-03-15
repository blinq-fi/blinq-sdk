"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const xploreClient_1 = require("../src/client/xploreClient");
const request = {
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
const client = new xploreClient_1.AggregatorClient({
    endpoint: RPC_SERVER,
    timeoutS: 10
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const route = yield client.aggregateCall(request);
        console.log("Best route:", JSON.stringify(route));
    }
    catch (err) {
        console.error("Failed to get route:", err);
    }
    finally {
        client.close();
    }
}))();
