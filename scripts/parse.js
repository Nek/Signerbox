module.exports = function(f) {
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
	return {
		format: "X.509", // || "PRIVKEYS" || "IIT"
		name: "Vasya Pupkin",
		pub_key: "12FA3E"
	}
}