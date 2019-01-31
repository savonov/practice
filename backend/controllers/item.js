const Item = require('../models').Item;

const ItemSerializer = require('../serializers/item');

const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

function serialize(data) {
  // console.log(data);
  return ItemSerializer.serialize(data);
}

module.exports = {
  list(req, res) {
    return Item
      .findAll({
        where: [
          req.query
        ]
      })
      .then((items) => res.status(200).send(serialize(items)))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Item
      .findById(req.params.id, {})
      .then((item) => {
        if (!item) {
          return res.status(404).send({
            message: 'item Not Found',
          });
        }
        return res.status(200).send(serialize(item));
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    //Debug
    console.log(req.body);
    return new JSONAPIDeserializer().deserialize(req.body, (err, body) => {
      Item
        .create({
          title: body.title,
          value: body.value,
          type: body.type
        })
        .then((item) => res.status(201).send(serialize(item)))
        .catch((error) => res.status(400).send(error));
    });
  },

  update(req, res) {
    return Item
      .findById(req.params.id)
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: 'item Not Found',
          });
        }
        //Debug
        console.log(req.body);
        new JSONAPIDeserializer().deserialize(req.body, (err, body) => {
          return item
            .update({
              value: req.body.value || item.value,
              type: req.body.type || item.value,
              task_id: req.body.task_id || item.task_id,
            })
            .then(() => res.status(200).send(serialize(item)))
            .catch((error) => res.status(400).send(error));
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Item
      .findById(req.params.id)
      .then(item => {
        if (!item) {
          return res.status(400).send({
            message: 'item Not Found',
          });
        }
        return Item
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};
