var moment = require("moment-timezone");

/*
* date parser
---------------------------------------------- */
export function parse_dtLog (d) { 
    /*
        console.log(moment.tz("2016-02-04 16:03:50", "Europe/Rome").format());
        var m_date = moment(d, "YYYY-MM-DD-HH:mm:ss");
        var RomeDate = moment.tz(m_date, "Europe/Rome");
        var DublinDate = RomeDate.clone().tz("Europe/Dublin");
        console.log("DublinDate", DublinDate.format());
        return moment(d, "YYYY-MM-DD-HH:mm:ss.ZZ").toISOString();
    */
    return moment(d).toISOString();
}