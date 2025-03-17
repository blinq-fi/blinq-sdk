import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, ChannelCredentials, Client, type ClientOptions, type ClientUnaryCall, type handleUnaryCall, Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
export declare const protobufPackage = "xplore";
/** Status of the transaction */
export declare enum TransactionStatus {
    UNKNOWN = 0,
    PENDING = 1,
    COMPLETED = 2,
    FAILED = 3,
    UNRECOGNIZED = -1
}
export declare function transactionStatusFromJSON(object: any): TransactionStatus;
export declare function transactionStatusToJSON(object: TransactionStatus): string;
export interface ChainToken {
    chainId: string;
    address: string;
    isNative?: boolean | undefined;
}
export interface TransactionRecordRequest {
    transactionHash: string;
}
/** Transaction record for cross-chain operations */
export interface TransactionRecord {
    sourceTransactionHash: string;
    destinationTransactionHash: string;
    sourceTimestamp: number;
    destinationTimestamp: number;
    node: string;
    sender: string;
    amountIn: string;
    inputToken: ChainToken | undefined;
    outputToken: ChainToken | undefined;
    amountOut: string;
    recipientAddress: string;
    status: TransactionStatus;
}
export interface SwapRequest {
    inputToken: ChainToken | undefined;
    outputToken: ChainToken | undefined;
    amountIn: string;
    amountOutMin: string;
    slippageTolerancePercent: number;
    recipientAddress: string;
    senderAddress: string;
    exactOut: boolean;
    timeoutMs: number;
    generateDepositAddress: boolean;
}
/** Define a common transaction data message */
export interface TransactionData {
    evmData?: EvmTransactionData | undefined;
    solanaData?: SolanaTransactionData | undefined;
    suiData?: SuiTransactionData | undefined;
}
/** Update SwapResponse to use the common type */
export interface SwapResponse {
    uuid: string;
    amountOut: string;
    outputToken: ChainToken | undefined;
    pathSteps: Step[];
    amountIn: string;
    inputToken: string;
    refundAddress: string;
    chainId: string;
    recipientAddress: string;
    partnerId: number;
    depositAddress: string;
    /** Use the common wrapper */
    transactionData: TransactionData | undefined;
}
/** EVM transaction data */
export interface EvmTransactionData {
    /** Moved from SwapResponse */
    contractAddress: string;
    /** Moved from SwapResponse */
    calldata: string;
    /** Optional value field for ETH transfers */
    value: string;
}
/** Solana transaction data */
export interface SolanaTransactionData {
    txMessages: string[];
    blockhash: string;
    lastValidBlockHeight: number;
}
/** Sui transaction data (placeholder for future implementation) */
export interface SuiTransactionData {
    from: string;
    to: string;
    data: string;
    value: string;
}
export interface XploreRequest {
    inputToken: ChainToken | undefined;
    outputToken: ChainToken | undefined;
    amountIn: string;
    amountOutMin: string;
    slippageTolerancePercent: number;
    recipientAddress: string;
    senderAddress: string;
    exactOut: boolean;
    timeoutMs: number;
    generateDepositAddress: boolean;
}
export interface APISwapResponse {
    uuid: string;
    amountIn: string;
    amountOut: string;
    outputToken: ChainToken | undefined;
    pathSteps: Step[];
    depositAddress: string;
    transactionData: TransactionData | undefined;
}
export interface Step {
    inputToken: ChainToken | undefined;
    amountIn: string;
    protocolName: string;
    outputToken: ChainToken | undefined;
    amountOut: string;
}
/** Update RouteStep to use the common type */
export interface RouteStep {
    nodeId: string;
    inputToken: ChainToken | undefined;
    outputToken: ChainToken | undefined;
    amountIn: string;
    amountOut: string;
    /** Use the common wrapper */
    transactionData: TransactionData | undefined;
}
export interface XploreResponse {
    amountIn: string;
    amountOut: string;
    priceImpact: number;
    route: RouteStep[];
    executionTime: number;
    gasEstimate: number;
    depositAddress: string;
    value: string;
    transactionData: TransactionData | undefined;
}
export declare const ChainToken: MessageFns<ChainToken>;
export declare const TransactionRecordRequest: MessageFns<TransactionRecordRequest>;
export declare const TransactionRecord: MessageFns<TransactionRecord>;
export declare const SwapRequest: MessageFns<SwapRequest>;
export declare const TransactionData: MessageFns<TransactionData>;
export declare const SwapResponse: MessageFns<SwapResponse>;
export declare const EvmTransactionData: MessageFns<EvmTransactionData>;
export declare const SolanaTransactionData: MessageFns<SolanaTransactionData>;
export declare const SuiTransactionData: MessageFns<SuiTransactionData>;
export declare const XploreRequest: MessageFns<XploreRequest>;
export declare const APISwapResponse: MessageFns<APISwapResponse>;
export declare const Step: MessageFns<Step>;
export declare const RouteStep: MessageFns<RouteStep>;
export declare const XploreResponse: MessageFns<XploreResponse>;
export type AggregatorService = typeof AggregatorService;
export declare const AggregatorService: {
    readonly aggregateCall: {
        readonly path: "/xplore.Aggregator/AggregateCall";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: XploreRequest) => Buffer<ArrayBuffer>;
        readonly requestDeserialize: (value: Buffer) => XploreRequest;
        readonly responseSerialize: (value: XploreResponse) => Buffer<ArrayBuffer>;
        readonly responseDeserialize: (value: Buffer) => XploreResponse;
    };
    readonly getTransactionRecord: {
        readonly path: "/xplore.Aggregator/GetTransactionRecord";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TransactionRecordRequest) => Buffer<ArrayBuffer>;
        readonly requestDeserialize: (value: Buffer) => TransactionRecordRequest;
        readonly responseSerialize: (value: TransactionRecord) => Buffer<ArrayBuffer>;
        readonly responseDeserialize: (value: Buffer) => TransactionRecord;
    };
};
export interface AggregatorServer extends UntypedServiceImplementation {
    aggregateCall: handleUnaryCall<XploreRequest, XploreResponse>;
    getTransactionRecord: handleUnaryCall<TransactionRecordRequest, TransactionRecord>;
}
export interface AggregatorClient extends Client {
    aggregateCall(request: XploreRequest, callback: (error: ServiceError | null, response: XploreResponse) => void): ClientUnaryCall;
    aggregateCall(request: XploreRequest, metadata: Metadata, callback: (error: ServiceError | null, response: XploreResponse) => void): ClientUnaryCall;
    aggregateCall(request: XploreRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: XploreResponse) => void): ClientUnaryCall;
    getTransactionRecord(request: TransactionRecordRequest, callback: (error: ServiceError | null, response: TransactionRecord) => void): ClientUnaryCall;
    getTransactionRecord(request: TransactionRecordRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TransactionRecord) => void): ClientUnaryCall;
    getTransactionRecord(request: TransactionRecordRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TransactionRecord) => void): ClientUnaryCall;
}
export declare const AggregatorClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AggregatorClient;
    service: typeof AggregatorService;
    serviceName: string;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
