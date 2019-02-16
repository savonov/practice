const Item = require('../models').Item;

const _ = require('lodash');

const ItemSerializer = require('../serializers/item');

const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

function serialize(data) {
  return ItemSerializer.serialize(data);
}

function JSONAPIDeserialize(rawData, options) {
  options = options || {keyForAttribute: 'underscore_case'};
  return new Promise((resolve, reject) => {
    if (rawData && rawData.data) {
      new JSONAPIDeserializer(options).deserialize(rawData, function (err, meta) {
        if (err) {
          reject(err);
        }
        resolve(meta);
      });
    } else {
      resolve({});
    }
  });
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

  async add(req, res) {
    const rawItem = await JSONAPIDeserialize(req.body);
    return Item
      .create(rawItem)
      .then((item) => res.status(201).send(serialize(item)))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({
        message: 'item Not Found',
      });
    }
    const rawItem = await JSONAPIDeserialize(req.body);
    _.assign(item, rawItem).save()
      .then((item) => res.status(200).send(serialize(item)))
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
