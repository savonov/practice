const Item = require('../models').Item;
const Task = require('../models').Task;

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
    let rawItem = await JSONAPIDeserialize(req.body);
    // let rawTask = await JSONAPIDeserialize(req.body.data.relationships['tasks']);
    // console.log(rawTask.pop());
    let savedItem = await Item.create(rawItem);
    if (rawItem.task_id) {
      let task = await Task.findByPk(rawItem.task_id);
      if (rawItem.role === 'question') {
        task.addQuestion(savedItem, {through: {type: rawItem.role}})
      }
      if (rawItem.role === 'answer') {
        task.addAnswer(savedItem, {through: {type: rawItem.role}})
      }
    }

    res.status(201).send(serialize(savedItem));
  },

  async update(req, res) {
    let item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({
        message: 'item Not Found',
      });
    }
    let rawItem = await JSONAPIDeserialize(req.body);
    _.assign(item, rawItem).save();
    res.status(200).send(serialize(item));
  },

  // update(req, res) {
  //   return Item
  //     .findById(req.params.id)
  //     .then(item => {
  //       if (!item) {
  //         return res.status(404).send({
  //           message: 'item Not Found',
  //         });
  //       }
  //       //Debug
  //       console.log(req.body);
  //       new JSONAPIDeserializer().deserialize(req.body, (err, body) => {
  //         return item
  //           .update({
  //             value: req.body.value || item.value,
  //             type: req.body.type || item.value,
  //             task_id: req.body.task_id || item.task_id,
  //           })
  //           .then(() => res.status(200).send(serialize(item)))
  //           .catch((error) => res.status(400).send(error));
  //       });
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },

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
