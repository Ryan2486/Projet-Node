
const Materiels = require("../Controlleurs/Materiel.controlleurs.js");


module.exports = app => {
  
    var router = require("express").Router();
  
    // Create a new Materiel
    router.post("/", Materiels.Add);
  
    // Retrieve all Materiels
    router.get("/", Materiels.GetAll);
  /*
    // Retrieve all published Materiels
    router.get("/published", Materiels.findAllPublished);
  
    // Retrieve a single Materiel with id
    router.get("/:id", Materiels.findOne);
  */
    // Update a Materiel with id
    router.put("/Modif", Materiels.update);
  
    // Delete a Materiel with id
    router.put("/del", Materiels.delete);
  
    // // Delete all Materiels
    // router.delete("/", Materiels.deleteAll);
  
    app.use('/api/Materiel/', router);
  };