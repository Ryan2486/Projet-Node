const pg = require("./bd.js");
const { PrismaClient } = require('@prisma/client');

// Créez une instance du client Prisma
const prisma = new PrismaClient();


const Materiel = function (materiel) {
	this.NumMat = materiel.NumMat;
	this.Design = materiel.Design;
	this.Etat = materiel.Etat;
	this.Qte = materiel.Qte;
};

Materiel.GetAll = (res) => {
	let query = "SELECT * FROM materiel ";
	// if (Date_entree) {
	// 	query += `Date_entree  LIKE '%${Date_entree}% and'`;
	// }
	query += 'order by "Design" ASC';

	pg.query(query, (err, result) => {
		if (err) {
			console.log("Erreur: ", err.message);
			res(err, null);
			return;
		}
		console.log("Materiel: ", result.rows);
		res(null, result.rows);
	});
};

Materiel.Add = (Materiel, result) => {
	const query =
		'INSERT INTO materiel ("NumMat", "Design", "Etat", "Qte") VALUES ($1, $2, $3, $4)';
	const values = [Materiel.NumMat, Materiel.Design ,Materiel.Etat, Materiel.Qte];

	pg.query(query, values, (err, res) => {
		if (err) {
			console.error("Erreur lors de l'insertion :", err);
            result(" "+err,null);
		} else {
			console.log("Insertion réussie :", res.rows[0]);
            result(null, "Insertion réussie");
		}
	});
};
Materiel.update = (Materiel, res) => {
	const updateQuery = `
    UPDATE materiel 
    SET "Design" = $1, "Etat" = $2, "Qte" = $3
    WHERE materiel."NumMat" = $4`;

	const values = [Materiel.Design, Materiel.Etat, Materiel.Qte, Materiel.NumMat];
	console.log(values);
	pg.query(updateQuery, values, (err, result) => {
		if (err) {
			console.log("Error: ", err);
			res(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			res("not_found", null);
			return;
		}
		res(null, result);
	});
};
Materiel.delete = (Materiel, res) => {
	const query = `
    delete from materiel 
    WHERE materiel."NumMat" = $1`;
    console.log("4")
	const values = [Materiel.NumMat];
	pg.query(query, values, (err, result) => {
		if (err) {
			console.log("Error: ", err);
			res(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			res("not_found", null);
			return;
		}
		res(null, result);
	});
};


module.exports = Materiel;
