const Task = require('../models').Task;
const Item = require('../models').Item;

module.exports = {
  list(req, res) {

    return Task
      .findAll({
        include: {
          model: Item,
          as: 'items',
        },
        where: [
          req.query
        ]
      })
      .then((tasks) => res.status(200).send(tasks))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Task
      .findById(req.params.id, {
        include: {
          model: Item,
          as: 'items',
        },
      })
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }
        return res.status(200).send(task);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Task
      .create({
        exercise_id: req.body.exercise_id,
        answer_id: req.body.answer_id,
      })
      .then((task) => res.status(201).send(task))
      .catch((error) => res.status(400).send(error));
  },

  addWithItems(req, res) {
    return Task
      .create({
        exercise_id: req.body.exercise_id,
        answer_id: req.body.answer_id,
        items: req.body.items,
      }, {
        include: {
          model: Item,
          as: 'items',
        }
      })
      .then((task) => res.status(201).send(task))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Task
      .findById(req.params.id, {
        include: {
          model: Item,
          as: 'items',
        },
      })
      .then(task => {
        if (!task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }
        return task
          .update({
            exercise_id: req.body.exercise_id || task.exercise_id,
            answer_id: req.body.answer_id || task.answer_id,
            items: req.body.items,
          })
          .then(() => res.status(200).send(task))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Task
      .findById(req.params.id)
      .then(task => {
        if (!task) {
          return res.status(400).send({
            message: 'Task Not Found',
          });
        }
        return task
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

};