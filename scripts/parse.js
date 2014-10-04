var jk = require('jkurwa');
var keycoder = new jk.Keycoder();


module.exports = function(buffer) {
	/*
	returns "x509" || "privkeys" || "IIT" || "PBES2"
	certificate with credentials
	non-coded private keys
	encoded private keys
	{
		format: "PRIVKEYS",
		keys: [1234, 123213] // 1 or 2 element
	}

	*/
	console.log(buffer);
	var u8 = new Uint8Array(buffer);
	var res = keycoder.parse(keycoder.maybe_pem(u8));
    return res;
}
