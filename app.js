var ch = require('elementum-challenge');
var textEncoding = require('text-encoding');
const WebSocket = require('ws');

const fc = ch.getFirstCode('alejandrodelpapa@gmail.com', '358071b96575c563356f34c92de84bb05a3e8c272bb4c872e4286c4d3c0f0e2380b8cddc0b63573d4b7fd69086faa9ca0e967680748387484ac5aa12366e6492')
.then(function (fc) {
	console.log("STEP 1 ---------------------------------------------------------------");
	console.log("Busco FirstCode y obtengo:\n" + fc);
	//returns --> RG9uJ3QgZ2V0IGNvY2t5IGtpZCwgdGhhdCB3YXMgcHJldHR5IGVhc3kuIENvbm5lY3QgdXNpbmcgU29ja2V0LmlvIGxpYnJhcnkgdG8gIndzczovL25vZGVjb25mLmVsZW1lbnR1bS5jb206MTc1NCIsIHNlbmQgYSAicmVxIiBldmVudCB3aXRoIHRoZSBmb2xsb3dpbmcgSlNPTiBvYmplY3Q6IHsgZW1haWw6ICJhbGVqYW5kcm9kZWxwYXBhQGdtYWlsLmNvbSIsIHRva2VuOiAiNzljNzVmNmE1ZTFlMTE0MDZhYTY0NjFmMzJmYmRmOWZhN2U0ZmUxOGQwODA3NDg0YzVkNGEyMzc3ODY2YTExN2MyYzA3YWY5NTEyNjgyYTJkNzc3YTlkNDVhMDgwNDBkNjUwYmJjZDNlOGFjMjUyNWY4ZWRjMWI5NmUwMzcwMjQifS4gWW91IHdpbGwgcmVjZWl2ZSBhICJyZXMiIGV2ZW50IHdpdGggdGhlIGRhdGEgeW91IG5lZWQgZm9yIHRoZSBuZXh0IHN0ZXAuIEdvb2QgbHVjay4uLg==
	console.log("\nBueno es un base64 el cual lo parseo y obtengo:");
	var buf = Buffer.from(fc, 'base64');
	console.log(buf);
	//returns --> <Buffer 44 6f 6e 27 74 20 67 65 74 20 63 6f 63 6b 79 20 6b 69 64 2c 20 74 68 61 74 20 77 61 73 20 70 72 65 74 74 79 20 65 61 73 79 2e 20 43 6f 6e 6e 65 63 74 ... >
	console.log("\nAl verlo no tengo idea de que se trata, entonces veo q tipo tiene el objeto..");
	console.log("es un: " + Object.prototype.toString.call(buf));
	//returns --> [object Uint8Array]

	//npm install text-encoding
	console.log("STEP 2 ---------------------------------------------------------------");
	console.log("\nParseo ese objeto a string y obtengo el siguiente mensaje:");
	var TextDecoder = textEncoding.TextDecoder;
	var string = new TextDecoder("utf-8").decode(buf);
	console.log(string);
	/*returns --> Don't get cocky kid, that was pretty easy. Connect using Socket.io library to "wss://nodeconf.elementum.com:1754",
	send a "req" event with the following JSON object: { email: "alejandrodelpapa@gmail.com", 
	token: "79c75f6a5e1e11406aa6461f32fbdf9fa7e4fe18d0807484c5d4a2377866a117c2c07af9512682a2d777a9d45a08040d650bbcd3e8ac2525f8edc1b96e037024"}.
	You will receive a "res" event with the data you need for the next step. Good luck...*/

	//npm install --save ws

	const ws = new WebSocket('wss://nodeconf.elementum.com:1754');
	const json = '{"email": "alejandrodelpapa@gmail.com", "token": "79c75f6a5e1e11406aa6461f32fbdf9fa7e4fe18d0807484c5d4a2377866a117c2c07af9512682a2d777a9d45a08040d650bbcd3e8ac2525f8edc1b96e037024"}';

	console.log("STEP 3 ---------------------------------------------------------------");
	console.log("\nIntento abrir conexion con el socket");
	
	ws.on('open', function open() {
		console.log('\nSocket abierto! Envio mensaje');
		ws.send(json);
	});

	ws.on('error', function(error) {
		console.log("Obtengo el siguiente error:\n" + error);
		console.log("\nAhora entiendo lo de \"Good luck...\"");
	})
	
	ws.on('message', function incoming(res) {
		console.log("\nRecibo como respuesta:\n" + res);
		goToStep4(res);
	});

	function goToStep4(res) {
		console.log("STEP 4 ---------------------------------------------------------------");

	}
});
