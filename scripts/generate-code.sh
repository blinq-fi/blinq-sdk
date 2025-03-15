#!/bin/bash

protoc \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=./src/proto \
    --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true \
    -I ./proto \
    ./proto/*.proto
