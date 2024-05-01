const express = require("express");
const cors = require("cors");
const os = require('os');

const app = express();

var corsOptions = {
	origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Ryan application." });
});

require("./Routes/Materiel.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.listen(PORT,() => {
// 	console.log(`Server is running on port ${PORT}.`);
// });
app.listen(PORT,() => {
	const networkInterfaces = os.networkInterfaces();
	Object.keys(networkInterfaces).forEach(interfaceName => {
	  networkInterfaces[interfaceName].forEach(interface => {
		if (interface.family === 'IPv4' && !interface.internal) {
		  console.log(`Serveur Express en cours d'exécution sur http://${interface.address}:${PORT}`);
		}
	  });
	});
  });
