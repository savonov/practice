import Route from '@ember/routing/route';
import {
  set
} from '@ember/object';

export default Route.extend({
  model(params) {
    // return {
    //   "id": 3,
    //   "title": "Look and match.",
    //   "description": "Description Exercise",
    //   "type": "matching",
    //   "tasks": [
    //     {
    //       "id": 1,
    //       "exercise_id": 3,
    //       "answer_id": 2,
    //       "items": [
    //         {
    //           "id": 1,
    //           "value": "/assets/images/1.png",
    //           "type": "type item",
    //           "task_id": 1
    //         },
    //         {
    //           "id": 2,
    //           "value": "a cold",
    //           "type": "type item",
    //           "task_id": 1
    //         }
    //       ]
    //     },
    //     {
    //       "id": 2,
    //       "exercise_id": 3,
    //       "answer_id": 4,
    //       "items": [
    //         {
    //           "id": 3,
    //           "value": "/assets/images/2.png",
    //           "type": "type item",
    //           "task_id": 2
    //         },
    //         {
    //           "id": 4,
    //           "value": "a cough",
    //           "type": "type item",
    //           "task_id": 2
    //         }
    //       ]
    //     },
    //     {
    //       "id": 3,
    //       "exercise_id": 3,
    //       "answer_id": 6,
    //       "items": [
    //         {
    //           "id": 5,
    //           "value": "/assets/images/3.png",
    //           "type": "type item",
    //           "task_id": 3
    //         },
    //         {
    //           "id": 6,
    //           "value": "a temperature",
    //           "type": "type item",
    //           "task_id": 3
    //         }
    //       ]
    //     },
    //     {
    //       "id": 4,
    //       "exercise_id": 3,
    //       "answer_id": 8,
    //       "items": [
    //         {
    //           "id": 7,
    //           "value": "/assets/images/4.png",
    //           "type": "type item",
    //           "task_id": 4
    //         },
    //         {
    //           "id": 8,
    //           "value": "a headache",
    //           "type": "type item",
    //           "task_id": 4
    //         }
    //       ]
    //     },
    //     {
    //       "id": 5,
    //       "exercise_id": 3,
    //       "answer_id": 10,
    //       "items": [
    //         {
    //           "id": 9,
    //           "value": "/assets/images/5.png",
    //           "type": "type item",
    //           "task_id": 5
    //         },
    //         {
    //           "id": 10,
    //           "value": "a stomach-ache",
    //           "type": "type item",
    //           "task_id": 5
    //         }
    //       ]
    //     },
    //     {
    //       "id": 6,
    //       "exercise_id": 3,
    //       "answer_id": 12,
    //       "items": [
    //         {
    //           "id": 11,
    //           "value": "/assets/images/6.png",
    //           "type": "type item",
    //           "task_id": 6
    //         },
    //         {
    //           "id": 12,
    //           "value": "a toothache",
    //           "type": "type item",
    //           "task_id": 6
    //         }
    //       ]
    //     },
    //     {
    //       "id": 7,
    //       "exercise_id": 3,
    //       "answer_id": 14,
    //       "items": [
    //         {
    //           "id": 13,
    //           "value": "/assets/images/7.png",
    //           "type": "type item",
    //           "task_id": 7
    //         },
    //         {
    //           "id": 14,
    //           "value": "an earache",
    //           "type": "type item",
    //           "task_id": 7
    //         }
    //       ]
    //     },
    //     {
    //       "id": 8,
    //       "exercise_id": 3,
    //       "answer_id": 16,
    //       "items": [
    //         {
    //           "id": 15,
    //           "value": "/assets/images/8.png",
    //           "type": "type item",
    //           "task_id": 8
    //         },
    //         {
    //           "id": 16,
    //           "value": "a backache",
    //           "type": "type item",
    //           "task_id": 8
    //         }
    //       ]
    //     }
    //   ]
    // }
    return this.store.findRecord('exercise',params.id);

  },

  setupController(controller, model) {
    set(controller, 'exercise', model);
  }
});
