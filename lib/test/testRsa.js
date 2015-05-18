function test() {
	var NodeRSA = require('node-rsa');
	var key = new NodeRSA({
		b: 512
	});

 	var keyData = "-----BEGIN PUBLIC KEY-----\
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIPmth+KR5csW4wS9K7GFn2XkRSGljla\
qOEyBAmpCTlhTVlCrc9Q2s6ZDxdxX5tkxKTxbAS5/mv2+FAJSgX4Fp0CAwEAAQ==\
-----END PUBLIC KEY-----\
-----BEGIN PRIVATE KEY-----\
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAg+a2H4pHlyxbjBL0\
rsYWfZeRFIaWOVqo4TIECakJOWFNWUKtz1DazpkPF3Ffm2TEpPFsBLn+a/b4UAlK\
BfgWnQIDAQABAkBUicYoqOQBjDiQqoWQjv1TOZWO5kPaNrUOwJO97U0wLK8gpgs2\
CH+HhrP+ZTrOpCxXAs0hHGpJBANdBAznmVexAiEA53SL/5BlePudHfpBv6nhB9pY\
VAHwIbEagwSxxUIvnI8CIQCR44MMLRm3ZJvFZXxQB/L7vfNkMdRyPD+5xIHaQ0UI\
EwIhAMuEJV2wgCkjRYIIfSukmmQnT6d+lMFrUt6FkDLdAbRtAiAEA3lYfWkmtXrf\
nGImJYHW0SwABqrslaG/L5vO8GjWxwIgRW/1iCFINSbmRQAw+Yq9oX49lb1XRekR\
IelTsA1RREU=\
-----END PRIVATE KEY-----\
 -----END RSA PRIVATE KEY-----";
 	//key.importKey(keyData, 'pkcs8');
	//console.log(key);
	//console.log(new Buffer(key, 'base64').toString());
	//key.generateKeyPair(512);

	var publicDer = key.exportPublic();
	var privateDer = key.exportPrivate();
	console.log(publicDer);
	console.log(privateDer);

	return;

	var publicDer2 = publicDer.toString("base64");
	var privateDer2 = privateDer.toString("base64");
	console.log(publicDer2);
	console.log(privateDer2);


	// var text = 'Hello RSA!';
	// var encrypted = key.encrypt(text, 'base64');
	// console.log('encrypted: ', encrypted);
	// var decrypted = key.decrypt(encrypted, 'utf8');
	// console.log('decrypted: ', decrypted);
}

test();