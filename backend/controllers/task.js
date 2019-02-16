const Task = require('../models').Task;
const Item = require('../models').Item;

const _ = require('lodash');

const TaskSerializer = require('../serializers/task');

const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

function serialize(data) {
  return TaskSerializer.serialize(data);
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
    return Task
      .findAll({
        include: [{
          model: Item,
          as: 'questions',
          through: {
            attributes: [],
            where: {type: 'question'}
          }
        }, {
          model: Item,
          as: 'answers',
          through: {
            attributes: [],
            where: {type: 'answer'}
          }
        }],
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
        include: [{
          model: Item,
          as: 'questions',
          through: {
            attributes: [],
            where: {type: 'question'}
          }
        }, {
          model: Item,
          as: 'answers',
          through: {
            attributes: [],
            where: {type: 'answer'}
          }
        }],
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

  async add(req, res) {
    const rawTask = await JSONAPIDeserialize(req.body);
    return Task
      .create(rawTask)
      .then((task) => res.status(201).send(serialize(task)))
      .catch((error) => res.status(400).send(error));
  },

  async addWithItems(req, res) {
    const rawTask = await JSONAPIDeserialize(req.body);
    const savedTask = await Task.create(rawTask);

    const rawQuestions = await JSONAPIDeserialize(req.body.data.relationships['questions']);

    rawQuestions.forEach(async (question) => {
      let item = await Item.findByPk(question.id);
      savedTask.addQuestion(item, {through: {type: 'question'}});
    });

    const rawAnswers = await JSONAPIDeserialize(req.body.data.relationships['answers']);

    rawAnswers.forEach(async (answer) => {
      let item = await Item.findByPk(answer.id);
      savedTask.addAnswer(item, {through: {type: 'answer'}});
    });

    res.status(201).send(serialize(savedTask));
  },

  async updateWithItems(req, res) {
    console.log(req.body);

    const rawTask = await JSONAPIDeserialize(req.body);
    const dbTask = await Task.findByPk(rawTask.id, {
      include: [{
        model: Item,
        as: 'questions',
        through: {
          attributes: [],
          where: {type: 'question'}
        }
      }, {
        model: Item,
        as: 'answers',
        through: {
          attributes: [],
          where: {type: 'answer'}
        }
      }],
    });

    //questions
    const taskQuestions = dbTask.questions.map((question) => {
      return {id: question.id.toString()};
    });

    console.log('dbTaskQuestions');
    console.log(taskQuestions);
    //
    const requestQuestions = await JSONAPIDeserialize(req.body.data.relationships['questions']);

    console.log('requestQuestions');
    console.log(requestQuestions);

    const questionToInsert = _.differenceBy(requestQuestions, taskQuestions, 'id');
    const questionToDelete = _.differenceBy(taskQuestions, requestQuestions, 'id');

    console.log('questionToDelete');
    console.log(questionToDelete);
    // delete
    questionToDelete.forEach(async (question) => {
      const item = await Item.findByPk(question.id);
      dbTask.removeQuestion(item);
    });

    console.log('questionToInsert');
    console.log(questionToInsert);
    // insert / attach
    questionToInsert.forEach(async (question) => {
      const item = await Item.findByPk(question.id);
      dbTask.addQuestion(item, {through: {type: 'question'}});
    });

    //answers
    const taskAnswers = dbTask.answers.map((answer) => {
      return {id: answer.id.toString()};
    });

    console.log('dbTaskAnswers');
    console.log(taskAnswers);

    const requestAnswers = await JSONAPIDeserialize(req.body.data.relationships['answers']);

    const answersToInsert = _.differenceBy(requestAnswers, taskAnswers, 'id');
    const answersToDelete = _.differenceBy(taskAnswers, requestAnswers, 'id');

    console.log('answersToDelete');
    console.log(answersToDelete);

    // delete
    answersToDelete.forEach(async (answer) => {
      const item = await Item.findByPk(answer.id);
      dbTask.removeAnswer(item);
    });

    console.log('answersToInsert');
    console.log(answersToInsert);

    // insert / attach
    answersToInsert.forEach(async (answer) => {
      const item = await Item.findByPk(answer.id);
      dbTask.addAnswer(item, {through: {type: 'answer'}});
    });

    res.status(201).send(serialize(dbTask));
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
