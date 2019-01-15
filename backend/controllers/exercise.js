const Exercise = require('../models').Exercise;
const Task = require('../models').Task;

module.exports = {
  list(req, res) {
    return Exercise
      .findAll({
        include: [{
          model: Task,
          as: 'tasks'
        }],
        order: [
          ['createdAt', 'DESC']
        ],
        where: [
          req.query
        ]
      })
      .then((Exercises) => res.status(200).send(Exercises))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {

    return Exercise
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'tasks'
        }],
      })
      .then((Exercise) => {
        if (!Exercise) {
          return res.status(404).send({
            message: 'Exercise Not Found',
          });
        }
        return res.status(200).send(Exercise);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    console.log(req.body)
    return Exercise
      .create({
        name: req.body.name,
        description: req.body.description,
        type_id: req.body.type_id
      })
      .then((Exercise) => res.status(201).send(Exercise))
      .catch((error) => res.status(400).send(error));
  },

  addWithTasks(req, res) {
    return Exercise
      .create({
        name: req.body.name,
        description: req.body.description,
        type_id: req.body.type_id,
        tasks: req.body.tasks,
      }, {
        include: [{
          model: Task,
          as: 'tasks'
        }]
      })
      .then((Exercise) => res.status(201).send(Exercise))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Exercise
      .findById(req.params.id, {
        include: [{
          model: Task,
          as: 'task'
        }],
      })
      .then(Exercise => {
        if (!Exercise) {
          return res.status(404).send({
            message: 'Exercise Not Found',
          });
        }
        return Exercise
          .update({
            name: req.body.name || Exercise.name,
            description: req.body.description || Exercise.description,
          })
          .then(() => res.status(200).send(Exercise))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Exercise
      .findById(req.params.id)
      .then(Exercise => {
        if (!Exercise) {
          return res.status(400).send({
            message: 'Exercise Not Found',
          });
        }
        return Exercise
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};