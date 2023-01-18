module.exports = app => {
    const guests = require("../controllers/guests.controller.js");
    const {checkAdmin} = require("../middleware/verifyLogin")
    var router = require("express").Router();
  
    // Create a new guest
    router.post("/", guests.create);
  
    // Retrieve all guests
    router.get("/", checkAdmin, guests.findAll);

    // Retrieve all notes
    router.get("/notes", guests.findAllNotes);
  
    // Retrieve a single guest with id
    router.get("/:id", checkAdmin, guests.findOne);
  
    // Update a guest with id
    router.put("/:id", checkAdmin, guests.update);
  
    // Delete a guest with id
    router.delete("/:id", checkAdmin, guests.delete);
  
    // Delete all guests
    router.delete("/", checkAdmin, guests.deleteAll);
  
    app.use('/api/guests', router);
  };