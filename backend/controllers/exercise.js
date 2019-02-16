const Exercise = require('../models').Exercise;
const Task = require('../models').Task;
const Item = require('../models').Item;

const _ = require('lodash');

const ExerciseSerializer = require('../serializers/exercise');

const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

function serialize(data) {
  return ExerciseSerializer.serialize(data);
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
    return Exercise
      .findAll({
        include: [{
          model: Task,
          as: 'tasks',
          include: [{
            model: Item,
            as: 'questions',
            through: {
              attributes: [],
              where: {
                type: 'question'
              }
            }
          }, {
            model: Item,
            as: 'answers',
            through: {
              attributes: [],
              where: {
                type: 'answer'
              }
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
          include: [{
            model: Item,
            as: 'questions',
            through: {
              attributes: [],
              where: {
                type: 'question'
              }
            }
          }, {
            model: Item,
            as: 'answers',
            through: {
              attributes: [],
              where: {
                type: 'answer'
              }
            }
          }],
        }],
        where: [
          req.query
        ]
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

  async add(req, res) {
    let rawExercise = await JSONAPIDeserialize(req.body);
    return Exercise
      .create(rawExercise)
      .then((exercise) => res.status(201).send(serialize(exercise)))
      .catch((error) => res.status(400).send(error));
  },

  async update(req, res) {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).send({
        message: 'Exercise Not Found',
      });
    }
    const rawExercise = await JSONAPIDeserialize(req.body);
    _.assign(exercise, rawExercise).save()
      .then((exercise) => res.status(200).send(serialize(exercise)))
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
