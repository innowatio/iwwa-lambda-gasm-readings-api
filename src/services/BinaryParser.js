/*
 * BinaryParser
 * -----------------------------------------------------------------------*/
 
export function toDouble (m_hex) {
    var buf = new Buffer(8);
    var bufIdx=0;
    for (var i = 0; i < m_hex.length; i+=2) {
        buf[bufIdx] = "0x" + m_hex.substr(i, 2);
        bufIdx++;
    }    
    return  buf.readDoubleBE(0);   
} 
 

 
 
