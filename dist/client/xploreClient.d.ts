import { TransactionRecord, XploreRequest, XploreResponse } from "../proto/aggregator";
import { Metadata } from "@grpc/grpc-js";
type AggregatorClientConfig = {
    endpoint: string;
    timeoutS?: number;
    metadata?: Metadata;
};
export declare class AggregatorClient {
    private client;
    constructor(config: AggregatorClientConfig);
    private callService;
    aggregateCall(req: XploreRequest): Promise<XploreResponse>;
    getTransactionRecord(txHash: string): Promise<TransactionRecord>;
    private validateXploreRequest;
    private normalizeError;
    close(): void;
    private getChannelOptions;
}
export {};
