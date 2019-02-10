import Route from '@ember/routing/route';
import {
  set
} from '@ember/object';

export default Route.extend({
  model(params) {
    return {
      "id": 1,
      "title": "Input right answers",
      "description": "Description Exercise",
      "type": "texting",
      "tasks": [
        {
          "id": 1,
          "exercise_id": 3,
          "answer_id": 2,
          "items": [
            {
              "id": 1,
              "value": "/assets/images/1.png",
              "type": "image",
              "task_id": 1
            },
            {
              "id": 2,
              "value": "cold",
              "type": "text",
              "task_id": 1
            }
          ]
        },

        {
          "id": 6,
          "exercise_id": 3,
          "answer_id": 12,
          "items": [
            {
              "id": 11,
              "value": "/assets/images/6.png",
              "type": "image",
              "task_id": 6
            },
            {
              "id": 12,
              "value": "toothache",
              "type": "text",
              "task_id": 6
            }
          ]
        },
        {
          "id": 7,
          "exercise_id": 3,
          "answer_id": 14,
          "items": [
            {
              "id": 13,
              "value": "/assets/images/7.png",
              "type": "image",
              "task_id": 7
            },
            {
              "id": 14,
              "value": "earache",
              "type": "text",
              "task_id": 7
            }
          ]
        },{
          "id": 9,
          "exercise_id": 3,
          "answer_id": 17,
          "items": [
            {
              "id": 17,
              "value": "/assets/audio/foot.wav",
              "type": "audio",
              "task_id": 8
            },
            {
              "id": 18,
              "value": "foot",
              "type": "text",
              "task_id": 8
            }
          ]
        },
        {
          "id": 8,
          "exercise_id": 3,
          "answer_id": 16,
          "items": [
            {
              "id": 15,
              "value": "/assets/images/8.png",
              "type": "image",
              "task_id": 8
            },
            {
              "id": 16,
              "value": "backache",
              "type": "text",
              "task_id": 8
            }
          ]
        },
        {
          "id": 10,
          "exercise_id": 3,
          "answer_id": 18,
          "items": [
            {
              "id": 19,
              "value": "/assets/audio/hand.wav",
              "type": "audio",
              "task_id": 10
            },
            {
              "id": 20,
              "value": "hand",
              "type": "text",
              "task_id": 10
            }
          ]
        }
      ]
    }
  },
  setupController(controller, model) {
    set(controller, 'exercise', model);
  }
});
