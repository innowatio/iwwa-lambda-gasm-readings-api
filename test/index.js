import {delay, resolve} from "bluebird";
import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import R from "ramda";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import * as indexModule from "index";
import {handler} from "index";

chai.use(chaiAsPromised);
chai.use(sinonChai);


describe("gasm readings handler", () => {

    var dispatchSpy = sinon.stub().returns(Promise.resolve());
    indexModule.__Rewire__("dispatch", dispatchSpy);        

    it("calls dispatch function with the correct parameters", (done) => {
        //var fakeRequest ={"path":"/?ID=5&V=1&D=2016-02-04-16:03:50&S=0&GASM01=41033AC25BAC7000;161289;1.061227;17.43649;1.038604;40C3C68CD84A0000;407B3A16C7400000;40AF258AE3200000;414;64.73656;67.23566;996;0&CTB01=101;97;0;0;72525;0&CTB02=108;96;105550;142703;73918;0&CTB03=96;98;0;0;73143;0&CTB04=686;675;86400;108967;102066;0"};
        var fakeRequest = {
            "url":"/", 
            "method":"GET", 
            "headers":{},
            "body":{},
            "query":{
                "ID":5,
                "V":1,
                "D":"2016-02-04-16:03:50",
                "S":0,
                "GASM01":"41033AC25BAC7000;161289;1.061227;17.43649;1.038604;40C3C68CD84A0000;407B3A16C7400000;40AF258AE3200000;414;64.73656;67.23566;996;0",
                "CTB01":"101;97;0;0;72525;0",
                "CTB02":"108;96;105550;142703",
                "CTB03":"96;98;0;0;73143;0",
                "CTB04":"686;675;86400;108967;102066;0"
            }
        };
        var fakeContext ={"succeed": sinon.spy(), "fail": sinon.spy() };
        handler(fakeRequest,fakeContext);
        setTimeout(function(){
            try {
                expect(dispatchSpy).to.have.callCount(1);
                expect(dispatchSpy).to.have.been.calledWith("element inserted in collection gasm-raw-reading");
                
                var secondParameter = dispatchSpy.getCall(0).args[1];
                expect(secondParameter).to.deep.equal(expectedOutpu1);
            } catch (error) {
                done(error);
                return;
            }
            done();
        },50);  
    
    });

});

var expectedOutpu1=  {
    "sensorId": "5_GASM01",
    "date": "2016-02-04T15:03:50.000Z",
    "measurements": [
    {
        "type": "CorrectedGasCounter",
        "source": "reading",
        "unitOfMeasurement": "m3",
        "value": 157528.29476249218
    },
    {
        "type": "MeasuredGasCounter",
        "source": "reading",
        "unitOfMeasurement": "m3",
        "value": "161289"
    },
    {
        "type": "Pressure",
        "source": "reading",
        "unitOfMeasurement": "bar",
        "value": "1.061227"
    },
    {
        "type": "Temperature",
        "source": "reading",
        "unitOfMeasurement": "°C",
        "value": "17.43649"
    },
    {
        "type": "ConversionCostant",
        "source": "reading",
        "unitOfMeasurement": "",
        "value": "1.038604"
    },
    {
        "type": "CorrectedVolInErrCond",
        "source": "reading",
        "unitOfMeasurement": "m3",
        "value": 10125.100350618362
    },
    {
        "type": "CorrectedVolDay",
        "source": "reading",
        "unitOfMeasurement": "m3",
        "value": 435.63056111335754
    },
    {
        "type": "CorrectedVolMonth",
        "source": "reading",
        "unitOfMeasurement": "m3",
        "value": 3986.771264076233
    },
    {
        "type": "MeasuredVolDay",
        "source": "reading",
        "unitOfMeasurement": "m3",
        "value": "414"
    },
    {
        "type": "MeasuredFlow",
        "source": "reading",
        "unitOfMeasurement": "m3/h",
        "value": "64.73656"
    },
    {
        "type": "CorrectedFlow",
        "source": "reading",
        "unitOfMeasurement": "m3/h",
        "value": "67.23566"
    },
    {
        "type": "BatteryCapacity",
        "source": "reading",
        "unitOfMeasurement": "%",
        "value": 99.6
    }
    ]
}