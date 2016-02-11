
export function hex2bin (s) {
    for (var i = 0, l = s.length, r = ""; i < l; r += String.fromCharCode(parseInt(s.substr(i, 2), 16)), i += 2)    ;
    return r;
}