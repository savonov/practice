import Component from '@ember/component';
import Ember from 'ember';
import {task} from 'ember-concurrency';

const {get, set} = Ember;


export default Component.extend({

  actions: {
    async upload(file) {
      console.log('huesos');
      try {
        let fileUrl = (await file.upload('http://localhost:3000/api/file/upload')).body.fileUrl;
        console.log(fileUrl);
        this.item.set('value', fileUrl);
      } catch (e) {
        console.log(e);
      }
    }
  }
});
