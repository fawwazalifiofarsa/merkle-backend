const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;

// Create and Save a new admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a admin
  const admin = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  // Save admin in the database
  Admin.create(admin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Admin."
      });
    });
};

// Retrieve all admins from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Admin.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving admins."
      });
    });
};

// Find a single admin with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Admin.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find admin with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving admin with id=" + id
      });
    });
};

// Update a admin by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Admin.update(req.body, {
    where: { admin_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "admin was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update admin with id=${id}. Maybe admin was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating admin with id=" + id
      });
    });
};

// Delete a admin with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Admin.destroy({
    where: { admin_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "admin was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete admin with id=${id}. Maybe admin was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete admin with id=" + id
      });
    });
};

exports.login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!admin) {
      return res.status(404).send({ message: "admin Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      admin.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: admin.id }, "secretkey", {
      expiresIn: "24h"
    });

    return res.status(200).send({
      message: "Admin login successfully",
      token:token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
