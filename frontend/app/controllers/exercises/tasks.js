import Controller from '@ember/controller';

export default Controller.extend({
  question_id: null,
  answer_id: null,

  actions: {
    back() {
      this.exercise.deleteRecord();
      this.transitionToRoute('exercises');
    },

    async saveItem(item) {
      await item.save();
    },

    async addTask() {
      let newTask = await this.store.createRecord('task', {
        exerciseId: this.exercise.id
      });
      this.exercise.tasks.pushObject(newTask)
    },

    deleteTask(task) {
      task.destroyRecord();
    },

    async addQuestion(task) {
      let item;
      if (this.question_id) {
        item = await this.store.findRecord('item', this.question_id);
      } else {
        item = await this.store.createRecord('item');
      }

      // this.question_id = null;

      task.questions.pushObject(item);
      task.currentState.becomeDirty(task);
    },

    async addAnswer(task) {
      let item;
      if (this.answer_id) {
        item = await this.store.findRecord('item', this.answer_id);
      } else {
        item = await this.store.createRecord('item');
      }

      // this.answer_id = null;

      task.answers.pushObject(item);
      task.currentState.becomeDirty(task);
    },

    deleteQuestion(task, item) {
      if (item.isNew) {
        item.destroyRecord();
      } else {
        task.questions.removeObject(item);
      }

      task.currentState.becomeDirty(task);
    },

    deleteAnswer(task, item) {
      if (item.isNew) {
        item.destroyRecord();
      } else {
        task.answers.removeObject(item);
      }

      task.currentState.becomeDirty(task);
    },

    async saveTasks() {
      const findModifiedItems = (promises, item) => {
        if (item.hasDirtyAttributes) {
          promises.push(item.save());
        }
        return promises;
      };

      const [itemPromises, taskPromises] = this.exercise.tasks.reduce(([itemPromises, taskPromises], task) => {
        const prePromisesLength = itemPromises.length;
        task.questions.reduce(findModifiedItems, itemPromises);
        task.answers.reduce(findModifiedItems, itemPromises);
        if (itemPromises.length !== prePromisesLength || task.dirtyType !== undefined) {
          taskPromises.push(task);
        }
        return [itemPromises, taskPromises];
      }, [[], []]);

      await Promise.all(itemPromises).then(async () => {
        await Promise.all(taskPromises.map((task) => {
          return task.save();
        }));
      });

      this.transitionToRoute('exercises');
    }
  }
});
