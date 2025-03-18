import {
  AggregatorClient as GeneratedClient,
  TransactionRecordRequest,
  TransactionRecord,
  XploreRequest,
  XploreResponse,
} from "../proto/aggregator";
import { credentials, Metadata, ChannelOptions } from "@grpc/grpc-js";

type AggregatorClientConfig = {
  endpoint: string;
  timeoutS?: number;
  metadata?: Metadata;
};

export class AggregatorClient {
  private client: GeneratedClient;
  
  constructor(config: AggregatorClientConfig) {
    this.client = new GeneratedClient(
      config.endpoint,
      credentials.createInsecure(), // TODO: investigate ssl secure creds (Use insecure if needed)
      this.getChannelOptions(config)
    );
  }

  // Unified method for handling gRPC call patterns
  private async callService<T, U>(method: any, request: T): Promise<U> {
    return new Promise((resolve, reject) => {
      method.call(this.client, request, (err: any, res: U) => {
        if (err) reject(this.normalizeError(err));
        else resolve(res);
      });
    });
  }

  // Public API Methods
  async aggregateCall(req: XploreRequest): Promise<XploreResponse> {
    this.validateXploreRequest(req);
    return this.callService<XploreRequest, XploreResponse>(
      this.client.aggregateCall,
      req
    );
  }

  async getTransactionRecord(
    txHash: string
  ): Promise<TransactionRecord> {
    const request: TransactionRecordRequest = { transactionHash: txHash };
    return this.callService<TransactionRecordRequest, TransactionRecord>(
      this.client.getTransactionRecord,
      request
    );
  }

  // Input Validation
  private validateXploreRequest(req: XploreRequest) {
    if (!req.inputToken?.chainId || !req.outputToken?.chainId) {
      throw new Error("Invalid chain tokens in request");
    }
    // TODO: Add more validation as needed
  }

  // Enhanced Error Handling
  private normalizeError(err: any): Error {
    // TODO: normalize gRPC errors
    console.error(`GRPC_ERROR[${err.code}]: ${err.details}`);
    return new Error(
      `GRPC_ERROR[${err.code}]: ${err.details}, ${JSON.stringify(err)}`);
  }

  close() {
    this.client.close();
  }

  private getChannelOptions(config: AggregatorClientConfig): ChannelOptions {
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
