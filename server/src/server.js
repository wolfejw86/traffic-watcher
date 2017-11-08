//App depencencies -----------------------------------------/
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import path from 'path';
import PoliceRequest from "./httpSoap.js";

const pr = PoliceRequest.getInstance();


async function getTraffic() {
	try {
		const accidents = await pr.trafficGet();
		// console.log(accidents);
	} catch (err) {
		console.log(err);
	}
}
//App middleware -------------------------------------------/
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "view/dist/")));

app.get("/api/traffic/accidents", async (req, res, next) => {
	try {
		const response = await pr.trafficGet();
		const accidents = response["soap:Envelope"]["soap:Body"]["CMPDAccidentsResponse"]["CMPDAccidentsResult"]["ACCIDENTS"];
		res.json({ accidents });
	} catch (err) {
		next(err);
	}
});


app.get("/*", (req, res) => {
	res.sendFile(path.resolve(process.cwd(), "view/dist/index.html"));
});

function handleUnexpectedError(err, req, res, next) {
	res.status(500).send({ message: 'An error has occurred, please contact your system administrator' });
}
app.use(handleUnexpectedError);
//Port config ---------------------------------------------------/
const PORT = process.env.PORT || 3000;

app.listen(PORT, function (err) {
	if (err) {
		console.error(err);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});

// const interval = setInterval(() => getTraffic(), 1000 * 10);
// setTimeout(() => clearInterval(interval), 1000 * 60 * 5);