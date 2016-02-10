import {Kinesis} from "aws-sdk";
import getDispatch from "lk-dispatch";
import connect from "lambda-connect";
import log from "./services/logger";
import * as config from "./config";
import * as bitConverter from  "./services/BinaryParser";
var moment = require('moment');

    const kinesis = new Kinesis();

    const dispatch = getDispatch({
        kinesisClient: kinesis,
        kinesisStream: config.KINESIS_STREAM_NAME,
        producerId: "server@hostname"
    });

export const handler = connect({log})   
    .use(function (req){
  
    var myBinaryParser = (new bitConverter.BinaryParser(true, true));
    var m_Model ={}; 
    for (var prop in req.params) {
        var thenum = prop.replace(/^\D+/g, '');                                
        if (thenum !='') {
            var block = prop.replace(thenum, '');
            
            if (block == 'GASM') {
                m_Model.sensorId=req.params.ID+'_'+prop;
                m_Model.date=parse_dtLog(req.params.D);                
                
                var measurementsList=[];
                var  measurements={};
                var data =req.params[prop].split(';'); // req.params.GASM01.split(';');
                if (data.length >= 0) { 
                    measurements={}
                    measurements.type='CorrectedGasCounter';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3';                    
                    measurements.value = myBinaryParser.toDouble(hex2bin(data[0]));
                    measurementsList.push(measurements);
                }
                if (data.length >= 1) {
                    measurements={};
                    measurements.type='MeasuredGasCounter';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3';                     
                    measurements.value=data[1];
                    measurementsList.push(measurements);
                 }  
                if (data.length >= 2) {
                    measurements={};
                    measurements.type='Pressure';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='bar';                      
                    measurements.value=data[2];
                    measurementsList.push(measurements);
                 } 
                if (data.length >= 3) {
                    measurements={};
                    measurements.type='Temperature';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='°C';                      
                    measurements.value=data[3];
                    measurementsList.push(measurements);
                 }  
                if (data.length >= 4) {
                    measurements={};
                    measurements.type='ConversionCostant';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='';                      
                    measurements.value=data[4];
                    measurementsList.push(measurements);
                 } 
                if (data.length >= 5) {
                    measurements={};
                    measurements.type='CorrectedVolInErrCond';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3';                      
                    measurements.value=myBinaryParser.toDouble(hex2bin(data[5]));
                    measurementsList.push(measurements);
                 }  
                if (data.length >= 6) {
                    measurements={};
                    measurements.type='CorrectedVolDay';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3';                      
                    measurements.value=myBinaryParser.toDouble(hex2bin(data[6]));
                    measurementsList.push(measurements);
                 } 
                if (data.length >= 7) {
                    measurements={};
                    measurements.type='CorrectedVolMonth';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3';                      
                    measurements.value=myBinaryParser.toDouble(hex2bin(data[7]));
                    measurementsList.push(measurements);
                 } 
                if (data.length >= 8) {
                    measurements={};
                    measurements.type='MeasuredVolDay';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3';                      
                    measurements.value=data[8];
                    measurementsList.push(measurements);
                 }  
                if (data.length >= 9) {
                    measurements={};
                    measurements.type='MeasuredFlow';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3/h';                      
                    measurements.value=data[9];
                    measurementsList.push(measurements);
                 }
                if (data.length >= 10) {
                    measurements={};
                    measurements.type='CorrectedFlow';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='m3/h';                      
                    measurements.value=data[10];
                    measurementsList.push(measurements);
                 }  
                if (data.length >= 11) {
                    measurements={};
                    measurements.type='BatteryCapacity';
                    measurements.source='reading';  
                    measurements.unitOfMeasurement='%';                      
                    measurements.value=data[11]/10;
                    measurementsList.push(measurements);
                 }                                                                                                                                                      
                 
                  
                 m_Model.measurements=measurementsList;                
            }                                    
        } 
    }//end for


    //return m_Model; 
    


    const eventType = "element inserted in collection gasm-raw-reading";
    const eventData = m_Model;
    const eventOptions = {
        sourceUserId: "",
        partitionKey: config.KINESIS_PARTITION_KEY
    };
    return dispatch(eventType, eventData, eventOptions);

});

/*
* date parser
---------------------------------------------- */
function parse_dtLog(d){
    return moment(d, "YYYY-MM-DD-HH:mm:ss").toISOString();
}

/*
 * hex2bin 
 * -----------------------------------------------------------------------*/
function hex2bin(s) {
    for (var i = 0, l = s.length, r = ""; i < l; r += String.fromCharCode(parseInt(s.substr(i, 2), 16)), i += 2)    ;
    return r;
}
/*------------------------------------------------------------------------*/
