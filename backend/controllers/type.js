const Type = require('../models').Type;

module.exports = {
  list(req, res) {
    return Type
      .findAll({
        where: [
          req.query
        ]
      })
      .then((Types) => res.status(200).send(Types))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {

    return Type
      .findById(req.params.id, {})
      .then((Type) => {
        if (!Type) {
          return res.status(404).send({
            message: 'Type Not Found',
          });
        }
        return res.status(200).send(Type);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Type
      .create({
        name: req.body.name,
      })
      .then((Type) => res.status(201).send(Type))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Type
      .findById(req.params.id, {})
      .then(Type => {
        if (!Type) {
          return res.status(404).send({
            message: 'Type Not Found',
          });
        }
        return Type
          .update({
            name: req.body.name || Type.name,
          })
          .then(() => res.status(200).send(Type))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Type
      .findById(req.params.id)
      .then(Type => {
        if (!Type) {
          return res.status(400).send({
            message: 'Type Not Found',
          });
        }
        return Type
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};