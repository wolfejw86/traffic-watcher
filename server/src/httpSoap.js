const http = require('http');
const parser = require('xml2json');

const PoliceRequest = (function () {
	let instance = null;
	const xml = `<?xml version="1.0" encoding="utf-8"?>
	<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
	  <soap12:Body>
		<CMPDAccidents xmlns="http://maps.cmpd.org/" />
	  </soap12:Body>
	</soap12:Envelope>`;

	const http_options = {
		hostname: 'maps.cmpd.org',
		port: 80,
		path: '/datafeeds/gisservice.asmx',
		method: 'POST',
		headers: {
			'Content-Type': 'application/soap+xml; charset=utf-8',
			'Content-Length': xml.length
		}
	}
	function trafficGet() {
		const p = new Promise((resolve, reject) => {
			const req = http.request(http_options, (res) => {
				console.log(`STATUS: ${res.statusCode}`);
				console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
				res.setEncoding('utf8');
				let body = "";
				res.on('data', (chunk) => {
					body += chunk;
				});

				res.on('end', () => {
					const json = parser.toJson(body);
					resolve(JSON.parse(json));
				})
			});

			req.on('error', (e) => {
				reject(e);
				console.log(`problem with request: ${e.message}`);
			});

			// write data to request body
			req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string
			req.end();
		});
		return p;
	}
	function init() {
		return {
			trafficGet
		}
	}
	return {
		getInstance: function () {
			if (!instance) {
				instance = init();
			}
			return instance;
		}
	}

})();

export default PoliceRequest;