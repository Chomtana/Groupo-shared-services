import * as grpc from "@grpc/grpc-js";
import * as loader from "@grpc/proto-loader";

const loggingDefinition = loader.loadSync(
    __dirname + "/logging.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

export const loggingDescription = grpc.loadPackageDefinition(loggingDefinition).logging;