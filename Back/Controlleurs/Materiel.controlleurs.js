const Materiel = require("../Model/Materiel.model.js");

exports.Add = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	const materiel = new Materiel(req.body);
	Materiel.Add(materiel, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err
			});
		else res.send(data);
	});
};
exports.GetAll = (req, res) => {
	//   const Date = req.query.Date;

	Materiel.GetAll((err, data) => {
		if (err) {
			console.log("Erreur controlleur");
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving data.",
			});
		} else {
			res.json(data);
		}
	});
};
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}

	Materiel.update(new Materiel(req.body), (err, result) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found consommable with id ${req.body.NumMat}.`,
				});
			} else {
				res.status(500).send({
					message: "Error updating consommable with id " + req.body.NumMat,
				});
			}
		} else res.send(result);
	});
};
exports.delete = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
	}
	Materiel.delete(new Materiel(req.body), (err, result) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found consommable with id ${req.body.NumMat}.`,
				});
			} else {
				res.status(500).send({
					message: "Error delete materiel with id " + req.body.NumMat,
				});
			}
		} else res.send(result);
	});
};
