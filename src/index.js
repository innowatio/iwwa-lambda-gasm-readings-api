import {Kinesis} from "aws-sdk";
import getDispatch from "lk-dispatch";
import connect from "lambda-connect";
import log from "./services/logger";
import * as config from "./config";
import * as parser from "./services/queryParser"

const kinesis = new Kinesis();
const dispatch = getDispatch({
    kinesisClient: kinesis,
    kinesisStream: config.KINESIS_STREAM_NAME,
    producerId: "server@hostname"
});

export const handler = connect({log})   
    .use(function (req) {
        const eventType = "element inserted in collection gasm-raw-reading";
        const eventData = parser.getEventFromObject(req);
        const eventOptions = {
            sourceUserId: "",
            partitionKey: config.KINESIS_PARTITION_KEY
        };
        return dispatch(eventType, eventData, eventOptions);
    });