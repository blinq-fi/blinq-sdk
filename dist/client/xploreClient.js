import { __awaiter, __generator } from "tslib";
import { AggregatorClient as GeneratedClient, } from "../proto/aggregator";
import { credentials } from "@grpc/grpc-js";
var AggregatorClient = /** @class */ (function () {
    function AggregatorClient(config) {
        this.client = new GeneratedClient(config.endpoint, credentials.createInsecure(), // Use insecure if needed
        this.getChannelOptions(config));
    }
    // Unified method for handling gRPC call patterns
    AggregatorClient.prototype.callService = function (method, request) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                debugger;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        debugger;
                        method.call(_this.client, request, function (err, res) {
                            debugger;
                            if (err)
                                reject(_this.normalizeError(err));
                            else
                                resolve(res);
                        });
                    })];
            });
        });
    };
    // Public API Methods
    AggregatorClient.prototype.aggregateCall = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                debugger;
                this.validateXploreRequest(req);
                debugger;
                return [2 /*return*/, this.callService(this.client.aggregateCall, req)];
            });
        });
    };
    AggregatorClient.prototype.getTransactionRecord = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = { transactionHash: txHash };
                return [2 /*return*/, this.callService(this.client.getTransactionRecord, request)];
            });
        });
    };
    // Input Validation
    AggregatorClient.prototype.validateXploreRequest = function (req) {
        var _a, _b;
        if (!((_a = req.inputToken) === null || _a === void 0 ? void 0 : _a.chainId) || !((_b = req.outputToken) === null || _b === void 0 ? void 0 : _b.chainId)) {
            throw new Error("Invalid chain tokens in request");
        }
        // Add more validation as needed
    };
    // Enhanced Error Handling
    AggregatorClient.prototype.normalizeError = function (err) {
        return new Error("GRPC_ERROR[".concat(err.code, "]: ").concat(err.details, ", ").concat(JSON.stringify(err)));
    };
    AggregatorClient.prototype.close = function () {
        this.client.close();
    };
    AggregatorClient.prototype.getChannelOptions = function (config) {
        debugger;
        return {
            "grpc.max_receive_message_length": -1,
            "grpc.initial_reconnect_backoff_ms": 1000,
            "grpc.service_config": JSON.stringify({
                methodConfig: [{
                        name: [{ service: "xplore.Aggregator" }],
                        timeout: config.timeoutS ? "".concat(config.timeoutS, "s") : undefined
                    }]
            })
        };
    };
    return AggregatorClient;
}());
export { AggregatorClient };
//# sourceMappingURL=xploreClient.js.map