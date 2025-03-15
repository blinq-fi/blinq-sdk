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
exports.AggregatorClient = void 0;
const aggregator_1 = require("../proto/aggregator");
const grpc_js_1 = require("@grpc/grpc-js");
class AggregatorClient {
    constructor(config) {
        this.client = new aggregator_1.AggregatorClient(config.endpoint, grpc_js_1.credentials.createInsecure(), // Use insecure if needed
        this.getChannelOptions(config));
    }
    // Unified method for handling gRPC call patterns
    callService(method, request) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            return new Promise((resolve, reject) => {
                debugger;
                method.call(this.client, request, (err, res) => {
                    debugger;
                    if (err)
                        reject(this.normalizeError(err));
                    else
                        resolve(res);
                });
            });
        });
    }
    // Public API Methods
    aggregateCall(req) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            this.validateXploreRequest(req);
            debugger;
            return this.callService(this.client.aggregateCall, req);
        });
    }
    getTransactionRecord(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = { transactionHash: txHash };
            return this.callService(this.client.getTransactionRecord, request);
        });
    }
    // Input Validation
    validateXploreRequest(req) {
        var _a, _b;
        if (!((_a = req.inputToken) === null || _a === void 0 ? void 0 : _a.chainId) || !((_b = req.outputToken) === null || _b === void 0 ? void 0 : _b.chainId)) {
            throw new Error("Invalid chain tokens in request");
        }
        // Add more validation as needed
    }
    // Enhanced Error Handling
    normalizeError(err) {
        return new Error(`GRPC_ERROR[${err.code}]: ${err.details}, ${JSON.stringify(err)}`);
    }
    close() {
        this.client.close();
    }
    getChannelOptions(config) {
        debugger;
        return {
            "grpc.max_receive_message_length": -1,
            "grpc.initial_reconnect_backoff_ms": 1000,
            "grpc.service_config": JSON.stringify({
                methodConfig: [{
                        name: [{ service: "xplore.Aggregator" }],
                        timeout: config.timeoutS ? `${config.timeoutS}s` : undefined
                    }]
            })
        };
    }
}
exports.AggregatorClient = AggregatorClient;
