import bunyan from "bunyan";
import {identity} from "ramda";

import {NODE_ENV} from "../config";

const log = bunyan.createLogger({
    name: "lk-replay",
    streams: [
        NODE_ENV !== "test" ? {
            stream: process.stdout
        } : null
    ].filter(identity)
});

export default log;