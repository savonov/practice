const Exercise = require('../models').Exercise;
const Task = require('../models').Task;
const Item = require('../models').Item;

const ExerciseSerializer = require('../serializers/exercise');

const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

function serialize(data) {
  // console.log(data);
  return ExerciseSerializer.serialize(data);
}

module.exports = {
  list(req, res) {
    return Exercise
      .findAll({
        include: [{
          model: Task,
          as: 'tasks',
          include: [{
            model: Item,
            as: 'items',
            through: {
              as: 'role',
              attributes: ['type'],
            }
          }],
        }],
        where: [
          req.query
        ]
      })
      .then((exercises) => res.status(200).send(serialize(exercises)))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Exercise
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks',
          include: {
            model: Item,
            as: 'items',
          }
        }],
      })
      .then((exercise) => {
        if (!exercise) {
          return res.status(404).send({
            message: 'Exercise Not Found',
          });
        }
        return res.status(200).send(serialize(exercise));
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    new JSONAPIDeserializer().deserialize(req.body, function (err, body) {
      return Exercise
        .create({
          title: body.title,
          description: body.description,
          type: body.type
        })
        .then((exercise) => res.status(201).send(serialize(exercise)))
        .catch((error) => res.status(400).send(error));
    });
  },

  addWithTasks(req, res) {
    console.log(req.body);
    new JSONAPIDeserializer().deserialize(req.body, function (err, body) {
      console.log(req.body);
      return Exercise
        .create({
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          tasks: req.body.tasks,
        }, {
          include: [{
            model: Task,
            as: 'tasks',
            include: {
              model: Item,
              as: 'items'
            }
          }]
        })
        .then((exercise) => res.status(201).send(serialize(exercise)))
        .catch((error) => res.status(400).send(error));
    });
  },

  update(req, res) {
    return Exercise
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks',
          include: {
            model: Item,
            as: 'items',
          }
        }],
      })
      .then(exercise => {
        if (!exercise) {
          return res.status(404).send({
            message: 'Exercise Not Found',
          });
        }
        console.log(req.body);
        new JSONAPIDeserializer().deserialize(req.body, function (err, body) {
          return exercise
            .update({
              title: body.title || exercise.title,
              description: body.description || exercise.description,
              type: body.type || exercise.type,
              tasks: body.tasks,
            })
            .then(() => res.status(200).send(serialize(exercise)))
            .catch((error) => res.status(400).send(error));
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Exercise
      .findById(req.params.id)
      .then(exercise => {
        if (!exercise) {
          return res.status(400).send({
            message: 'Exercise Not Found',
          });
        }
        return exercise
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};
