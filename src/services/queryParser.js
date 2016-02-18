import * as bitConverter from  "./BinaryParser";
import * as dtLogParser from "./dtLogParser";

export function getEventFromObject (req) {
    var m_Model ={}; 
    for (var prop in req.query) {
        var thenum = prop.replace(/^\D+/g, "");                                
        if (thenum !="") {
            var block = prop.replace(thenum, "");
            
            if (block == "GASM") {
                m_Model.sensorId=req.query.ID+"_"+prop;
                m_Model.date=dtLogParser.parse_dtLog(req.query.D); 
                
                console.log("dtLog", m_Model.date);
                
                var measurementsList=[];
                var  measurements={};
                var data =req.query[prop].split(";"); 
                if (data.length >= 0) { 
                    measurements={};
                    measurements.type="CorrectedGasCounter";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3";                    
                    measurements.value = bitConverter.toDouble(data[0]); 
                    measurementsList.push(measurements);
                }
                if (data.length >= 1) {
                    measurements={};
                    measurements.type="MeasuredGasCounter";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3";                     
                    measurements.value=data[1];
                    measurementsList.push(measurements);
                }  
                if (data.length >= 2) {
                    measurements={};
                    measurements.type="Pressure";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="bar";                      
                    measurements.value=data[2];
                    measurementsList.push(measurements);
                } 
                if (data.length >= 3) {
                    measurements={};
                    measurements.type="Temperature";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="°C";                      
                    measurements.value=data[3];
                    measurementsList.push(measurements);
                }  
                if (data.length >= 4) {
                    measurements={};
                    measurements.type="ConversionCostant";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="";                      
                    measurements.value=data[4];
                    measurementsList.push(measurements);
                } 
                if (data.length >= 5) {
                    measurements={};
                    measurements.type="CorrectedVolInErrCond";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3";                      
                    measurements.value= bitConverter.toDouble(data[5]);
                    measurementsList.push(measurements);
                }  
                if (data.length >= 6) {
                    measurements={};
                    measurements.type="CorrectedVolDay";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3";                      
                    measurements.value= bitConverter.toDouble(data[6]);
                    measurementsList.push(measurements);
                } 
                if (data.length >= 7) {
                    measurements={};
                    measurements.type="CorrectedVolMonth";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3";                      
                    measurements.value= bitConverter.toDouble(data[7]);
                    measurementsList.push(measurements);
                } 
                if (data.length >= 8) {
                    measurements={};
                    measurements.type="MeasuredVolDay";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3";                      
                    measurements.value=data[8];
                    measurementsList.push(measurements);
                }  
                if (data.length >= 9) {
                    measurements={};
                    measurements.type="MeasuredFlow";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3/h";                      
                    measurements.value=data[9];
                    measurementsList.push(measurements);
                }
                if (data.length >= 10) {
                    measurements={};
                    measurements.type="CorrectedFlow";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="m3/h";                      
                    measurements.value=data[10];
                    measurementsList.push(measurements);
                }  
                if (data.length >= 11) {
                    measurements={};
                    measurements.type="BatteryCapacity";
                    measurements.source="reading";  
                    measurements.unitOfMeasurement="%";                      
                    measurements.value=data[11]/10;
                    measurementsList.push(measurements);
                } 
                
                m_Model.measurements=measurementsList;                
            }                                    
        } 
    } // end for 
       
    return m_Model;
}