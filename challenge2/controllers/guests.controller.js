const db = require("../models");
const Guest = db.guests;
const Op = db.Sequelize.Op;

// Create and Save a new guest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.address || !req.body.phone) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a guest
  const guest = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    note: req.body.note
  };

  // Save guest in the database
  Guest.create(guest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Guest."
      });
    });
};

// Retrieve all guests from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Guest.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving guests."
      });
    });
};

// Find a single guest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Guest.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find guest with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving guest with id=" + id
      });
    });
};

// find all notes
exports.findAllNotes = (req, res) => {
    Guest.findAll({ attributes: ['name', 'note']})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving notes."
        });
      });
  };

// Update a guest by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Guest.update(req.body, {
    where: { guest_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "guest was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update guest with id=${id}. Maybe guest was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating guest with id=" + id
      });
    });
};

// Delete a guest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Guest.destroy({
    where: { guest_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "guest was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete guest with id=${id}. Maybe guest was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete guest with id=" + id
      });
    });
};

// Delete all guests from the database.
exports.deleteAll = (req, res) => {
  Guest.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} guests were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all guests."
      });
    });
};