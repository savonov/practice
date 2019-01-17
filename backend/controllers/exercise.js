const Exercise = require('../models').Exercise;
const Task = require('../models').Task;
const Item = require('../models').Item;

module.exports = {
  list(req, res) {
    return Exercise
      .findAll({
        include: [{
          model: Task,
          as: 'tasks',
          include: {
            model: Item,
            as: 'items',
          }
        }],
        where: [
          req.query
        ]
      })
      .then((exercises) => res.status(200).send(exercises))
      .catch((error) => {
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
        return res.status(200).send(exercise);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body);

    return Exercise
      .create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type
      })
      .then((exercise) => res.status(201).send(exercise))
      .catch((error) => res.status(400).send(error));
  },

  addWithTasks(req, res) {
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
            as: 'items',
          }
        }]
      })
      .then((exercise) => res.status(201).send(exercise))
      .catch((error) => res.status(400).send(error));
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
        return exercise
          .update({
            title: req.body.title || exercise.title,
            description: req.body.description || exercise.description,
            type: req.body.type || exercise.type,
            tasks: req.body.tasks,
          })
          .then(() => res.status(200).send(exercise))
          .catch((error) => res.status(400).send(error));
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