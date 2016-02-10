import dotenv from "dotenv";

dotenv.load();

export const KINESIS_STREAM_NAME = process.env.KINESIS_STREAM_NAME || 'KINESIS_STREAM_NAME';
export const KINESIS_PARTITION_KEY = "iwwa-lambda-gasm-readings-api";
export const NODE_ENV = process.env.NODE_ENV;
