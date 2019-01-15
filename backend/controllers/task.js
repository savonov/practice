const Task = require('../models').Task;

module.exports = {
  list(req, res) {
    return Task
      .findAll({

        where: [
          req.query
        ]
      })
      .then((Tasks) => res.status(200).send(Tasks))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {

    return Task
      .findById(req.params.id, {})
      .then((Task) => {
        if (!Task) {
          return res.status(404).send({
            message: 'Task Not Found',
          });
        }
        return res.status(200).send(Task);
      })
      .catch((error) => res.status(400).send(error));
  },
  add(req, res) {
    return Type
      .create({
        question: req.body.question,
        answer: req.body.answer,
        exercise_id: req.body.exercise_id,
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
            question: req.body.question || Type.question,
            answer: req.body.answer || Type.answer,
            exercise_id: req.body.exercise_id || Type.exercise_id,
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