const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function insererDonnees() {
	try {
		// Supprimer toutes les données existantes dans l'ordre inverse
		await prisma.materiel.deleteMany();

		// Importer les données à partir des fichiers JSON
		const Mat = require("./Data.json");

		// Insérer les données dans la base de données

		await prisma.materiel.createMany({ data: Mat });

		console.log("Données insérées avec succès.");
	} catch (error) {
		console.error("Erreur lors de l'insertion des données:", error);
	} finally {
		await prisma.$disconnect();
	}
}

// Appeler la fonction pour insérer les données
insererDonnees();
