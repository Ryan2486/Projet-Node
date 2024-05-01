const pg = require("./bd.js");
const { PrismaClient } = require("@prisma/client");

// Créez une instance du client Prisma
const prisma = new PrismaClient();

const Materiel = function (materiel) {
	this.NumMat = materiel.NumMat;
	this.Design = materiel.Design;
	this.Etat = materiel.Etat;
	this.Qte = parseInt(materiel.Qte);
};

Materiel.GetAll = async (res) => {
	try {
		const Materiels = await prisma.materiel.findMany();
		
		console.log("Materiels :", Materiels);
		res(null, Materiels);
	} catch (error) {
		res("Erreur N°:" + error.code, null);
	}
};

Materiel.Add = async (Materiel, result) => {
	try {
		const rep = await prisma.materiel.create({ data: Materiel });
		result(null, rep);
	} catch (error) {
		if (error.code === "P2002") {
			result("Le N° du Materiel existe déjà dans la base de donnée", null);
		} else {
			result("Erreur N°:" + error.code, null);
		}
		console.error(error);
	}
};
Materiel.update = async (Materiel, result) => {
	
	try {
		const rep = await prisma.materiel.update({
			where: { NumMat: Materiel.NumMat },
			data: { Design: Materiel.Design, Qte: Materiel.Qte, Etat: Materiel.Etat },
		});
		result(null, rep);
	} catch (error) {
		result("Erreur N°:" + error.code, null);
	}
	
};
Materiel.delete = async (Materiel, result) => {
	try {
		const rep = await prisma.materiel.delete({
			where: { NumMat: Materiel.NumMat },
		  })
		  result(null, rep);
	} catch (error) {
		result("Erreur N°:" + error.code, null);
	}
};

module.exports = Materiel;
