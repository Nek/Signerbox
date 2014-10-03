var jk = require('jkurwa');
var keycoder = new jk.Keycoder();


module.exports = function(u8) {
	/*
	returns "X.509" || "PRIVKEYS" || "IIT"
	certificate with credentials
	non-coded private keys
	encoded private keys
	{
		format: "PRIVKEYS",
		keys: [1234, 123213] // 1 or 2 element
	}

	*/
    u8 = keycoder.maybe_pem(u8)
    return keycoder.parse(u8);
}
