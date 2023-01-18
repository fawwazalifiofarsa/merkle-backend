module.exports = app => {
    const admins = require("../controllers/admins.controller.js");
    const {checkAdmin} = require("../middleware/verifyLogin")
    var router = require("express").Router();
  
    // Login as an admin
    router.post('/login', admins.login); 

    // Create a new admin
    router.post("/", admins.create);
  
    // Retrieve all admins
    router.get("/", checkAdmin, admins.findAll);
  
    // Retrieve a single admin with id
    router.get("/:id", checkAdmin, admins.findOne);
  
    // Update a admin with id
    router.put("/:id", checkAdmin,  admins.update);
  
    // Delete a admin with id
    router.delete("/:id", checkAdmin, admins.delete);
  
    app.use('/api/admins', router);
  };