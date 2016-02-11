var moment = require("moment");

/*
* date parser
---------------------------------------------- */
export function parse_dtLog (d) {
    return moment(d, "YYYY-MM-DD-HH:mm:ss").toISOString();
}